import React from "react";
import axios from "axios";

function SampleData() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/screams`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let recentScreamsMarkup = data ? (
    data.map((scream) => <p key={scream.screamId}>{scream.body}</p>)
  ) : (
    <p>Loading...</p>
  );

  return (
    <div>
      <p>Sample data</p>
      {recentScreamsMarkup}
    </div>
  );
}

export default SampleData;
