## Shadow Exchange Scraper

### Overview

The Shadow Exchange Subgraph Scraper is a lightweight application designed to fetch and parse data from the Shadow Exchange subgraph (a GraphQL-based data source) and store it in a local SQLite database for efficient querying and analysis. This tool is ideal for developers, researchers, or analysts who need to work with Shadow Exchange data offline or integrate it into custom workflows.

### Features
- Data Retrieval: Connects to the Shadow Exchange subgraph endpoint to fetch real-time or historical data.
- Data Parsing: Processes GraphQL query responses into structured formats.
- SQLite Storage: Stores parsed data in a local SQLite database with a predefined schema.
- Lightweight: Minimal dependencies and simple setup.

### Installation
1. Clone the repository
```shell
git clone https://github.com/ArtemKolodko/shadow-scraper.git
cd shadow-scraper
```
2. Install dependencies:
```shell
npm install
```

### Usage
1. Run the scraper:
```shell
npm run dev
```
2. The script will:
- Query the Shadow Exchange subgraph
- Parse the response data
- Store the results in a SQLite database file (e.g., /export/shadow_export.db).
3. Check the `/export` folder


### Calculate TVL
```shell
npm install
npm run tvl
```
