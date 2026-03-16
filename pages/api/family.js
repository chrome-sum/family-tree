export default async function handler(req, res) {
  const TOKEN = process.env.AIRTABLE_TOKEN;
  const BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TABLE_NAME = "Members";

  async function fetchAllRecords(offset, allRecords) {
    let url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?pageSize=100`;
    if (offset) url += `&offset=${offset}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });

    const data = await response.json();

    // Kalau Airtable return error, lempar supaya ketangkap di catch
    if (data.error) {
      throw new Error(`Airtable: ${data.error.type} — ${data.error.message}`);
    }

    // Kalau tidak ada records sama sekali
    if (!data.records) {
      throw new Error(`Response tidak punya 'records'. Response: ${JSON.stringify(data)}`);
    }

    const records = allRecords.concat(data.records);

    if (data.offset) {
      return fetchAllRecords(data.offset, records);
    }
    return records;
  }

  try {
    const records = await fetchAllRecords(null, []);

    const familyData = records
      .filter(record => record && record.fields) // skip record kosong
      .map(record => {
        const f = record.fields;
        const node = {};

        node.id = parseInt(f.id);
        node.name = f.name || "";
        node.gender = f.gender || "";

        if (f.fid) node.fid = parseInt(f.fid);
        if (f.mid) node.mid = parseInt(f.mid);
        if (f.img) node.img = f.img;

        if (f.pids && f.pids.toString().trim() !== "") {
          node.pids = f.pids
            .toString()
            .split(",")
            .map(p => parseInt(p.trim()))
            .filter(p => !isNaN(p));
        }

        return node;
      })
      // Filter node yang id-nya tidak valid
      .filter(node => !isNaN(node.id));

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json(familyData);

  } catch (error) {
    console.error("Airtable error:", error.message);
    res.status(500).json({ error: error.message });
  }
}