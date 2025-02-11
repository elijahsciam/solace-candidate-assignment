- A great way to handle searching the large amount of data would be to build a custom pagination table along with a small backend object that provides db helper functions for pagination

  - object would contain limit, pages, total rows, sort, and query data
  - contain functionality to gather filter data from frontend URL params & combine into a SQL query

- In order to improve database speed and reduce the amount of data on the advocates table, I created a specialties table to host all of the kinds of specialties. I then created a many-to-many relationship (advocateSpecialties table) between the advocates & specialties tables in order to maintain consistency & easy querying.

- I added a material-react-table to front end in order to improve the UI & search functionality. Of course, this means the pagination is all taken care of on the front end but I did create a sample pagination Class to preview what it would look like managed on the BE

- given more time, I would potentially use react hooks (ex. useQuery from module '@tanstack/react-query') instead of useEffect for autocaching, automatic refetching, built in error & loading states, better performance, mutations... the list goes on :D

- added comments where necessary
