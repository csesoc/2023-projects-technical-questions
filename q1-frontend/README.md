> This question is relevant for **any project with a frontend** (Chaos, Circles,
> CSElectives, Freerooms, Jobsboard, Notangles, Structs.sh, Website).

# Question
There is a table rendered in pages/index.tsx and this table is controlled by components/Table.tsx.

This table contains a couple of alerts, and is structured using flexboxes. Have a look at an example of the data it is trying to render:

```
{
  columnTitles: ['Alert', 'Issue', 'Occurences'],
  rowContents: [
    {
      alertType: 'food',
      alertText: 'good!',
      alertOccurence: []
    },
    {
      alertType: 'water',
      alertText: 'low',
      alertOccurence: [{anomaly: 'dropped to 10% below normal', date: '11/11/2022'}]
    },
    {
      alertType: 'shelter',
      alertText: 'terrible :(',
      alertOccurence: [{anomaly: 'slept on cold ground', date: '11/11/2022'}, {anomaly: 'slept on hard concrete', date: '13/11/2022'}]
    }
  ]
}
```
This is how that table should look:
![Solution](solution1.png)
A few interesting features here include that there can be multiple occurances to the same alert, and that the text for the date is styled and off to the edge of the table.

You have 1 task, and 1 extension task:

1. Fill in the "occurances" column to render like in the screenshot. Again, notice that you will need the date to be off to the side and a different font colour. After this, change the content rendered (line ~43) to fill in your github name in the "YOUR NAME" space in the bottom alert. You should then take a screenshot, add it as "submission.png" then commit your code.
IMPORTANT: for this part, you must use CSS, and you must use flexboxes. Come up with a minimally invasive solution, which should not be more than 50 lines of code changed.


1. EXTENSION: modify the table to to add a way of adding a new alert, with no occurances. A stub component has been made called "AlertModal" which will render a modal when clicked, but does nothing with it. You should modify AlertModal to add a new occurance when filled.


# Getting set up
1.  you will need to install node/npm. This is best done using [nvm](https://github.com/nvm-sh/nvm). Run the bash script specified in the README of that repo to download nvm then use the command `nvm install --lts` to install the latest stable versions of npm/node. Run `node -v` to check success. The response should be something like 16.x.x or 18.x.x
2. run `npm install` to fetch dependencies.

3. run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
