export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const state = typeof req.query?.state === "string" ? req.query.state : "";

  if (!/^\d{2}$/.test(state)) {
    return res.status(400).json({ error: "Invalid state code." });
  }

  const apiKey = process.env.CENSUS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "City service is not configured. Please contact the clinic." });
  }

  try {
    const url = new URL("https://api.census.gov/data/2024/acs/acs5");
    url.search = new URLSearchParams({
      get: "NAME",
      for: "place:*",
      in: "state:" + state,
      key: apiKey
    }).toString();

    const response = await fetch(url);

    if (!response.ok) {
      console.error("Census API returned status:", response.status);
      return res.status(502).json({ error: "City data service is temporarily unavailable." });
    }

    const rows = await response.json();

    if (!Array.isArray(rows)) {
      return res.status(502).json({ error: "Invalid city data received." });
    }

    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
    return res.status(200).json(rows);
  } catch (error) {
    console.error("City lookup failed:", error);
    return res.status(502).json({ error: "Could not retrieve city data." });
  }
}