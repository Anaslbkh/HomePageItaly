export default {
  object: 'list',
  url: ' v1 reviews?limit=4&sort=review.score',
  meta: {
    airport: 1,
    reviews: {
      count: 12083,
      score: 8.879940564635959,
      best: 10
    }
  },
  data: [
    {
      id: 123,
      object: 'review',
      name: 'Bert Schuurman',
      date: {
        date: '2021-01-25 12:03:25.191596',
        timezone_type: 3,
        timezone: 'Europe Amsterdam'
      },
      score: 10,
      content: 'Goed service en snelle dienst'
    },
    {
      id: 456,
      object: 'review',
      name: 'Bert Schuurman',
      date: {
        date: '2021-01-25 12:03:25.191640',
        timezone_type: 3,
        timezone: 'Europe Amsterdam'
      },
      score: 10,
      content: 'Nette service, meteen de telefoon opgenomen en netjes weggebracht naar Schiphol en bij ophalen stond het busje al klaar...'
    },
    {
      id: 789,
      object: 'review',
      name: 'Bert Schuurman',
      date: {
        date: '2021-01-25 12:03:25.191642',
        timezone_type: 3,
        timezone: 'Europe Amsterdam'
      },
      score: 10,
      content: '100 % betrouwbaar. binnenkort weer met deze vriendelijke mensen...'
    },
    {
      id: 10,
      object: 'review',
      name: 'Bert Schuurman',
      date: {
        date: '2021-01-25 12:03:25.191644',
        timezone_type: 3,
        timezone: 'Europe Amsterdam'
      },
      score: 10,
      content: 'Everything was great'
    }
  ]
}
