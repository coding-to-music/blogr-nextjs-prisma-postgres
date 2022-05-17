// pages/lists.tsx

//useSWR allows the use of SWR inside function components
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR("/api/streetdata", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  return (
    <div>
      <h1>JSON from streets.json file</h1>
      <ul>
        <li>FROM: {data.record.from}</li>
        <li>TO: {data.record.to}</li>
        <li>WIDTH: {data.record.width}</li>
        <li>LENGTH: {data.record.length}</li>
      </ul>
    </div>
  );
}

// Sample Data

// {
//   "record": {
//     "id": 8221,
//     "uid": "a15c1f1d-9e4e-4dc7-9c45-c04412fc5064",
//     "name": "Next.js",
//     "language": "JavaScript"
//   }
// }

// {
//   "record": [
//     {
//       "STREET NAME": "ABERDEEN AVE",
//       "FROM": "MT AUBURN",
//       "TO": "HURON AVE",
//       "Width": "100",
//       "Length": "1280",
//       "Date": "1895",
//       "Non-City": " "
//     },
//     {
//       "STREET NAME": "ABERDEEN CT",
//       "FROM": "ABERDEEN",
//       "TO": "EASTERLY",
//       "Width": "29.33",
//       "Unnaccepted Length": "100",
//       "Non-City": "X"
//     },
