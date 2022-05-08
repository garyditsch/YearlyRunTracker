# What is the YearlyRunTracker project?

I love running. I also love to review the data. There are many sites for this information, with Strava being the most common place that I use on a daily basis for looking at my running stats. 

However, there are times that I want to view data in my own way, using metrics that matter to me. The other thing that I wanted was a back-up of the data, just in case. 

This project is an opportunity for me to play around with various tools, processes and technologies. At the same time, I get to review my running!

# What technologies are used in this project?

This is actually a two part question, as there are tools being used to collect and store the data and then there are the technologies used to build the web app for consuming the information. 

1. Tools to collect, store, and deliver the data: 

- Garmin watch (Garmin Connect)
- Strava (syncs to Garmin)
- Zapier (new Strava activity triggers an action)
- Airtable (the place Zapier stores the new run)
- Netlify (serverless function that provides an api endpoint that hits the Airtable endpoint)

2. Technologies used build the app

- HTML & CSS (pretty small amounts of this really)
- Javascript (vanillia for this, no frameworks use)
- d3js (used to generate some more complicated chart needs)
- chartjs (when I just wanted a simiple chart rendered)
- parceljs (to bundle everything up for production, but also love the dev tools it provides)
- surge.sh (where the app is deployed)

