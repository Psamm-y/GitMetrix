// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GRAPHQL_URL = 'https://api.github.com/graphql'; 

const getContributionData = async (username) => {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query, variables: { login: username } }),
  });

  if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);

  return await response.json();
};

app.get('/contributions/:username', async (req, res) => {
  try {
    const data = await getContributionData(req.params.username);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});