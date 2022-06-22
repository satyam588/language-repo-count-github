import "./App.css";

import React, { Component } from "react";
import { Chart } from "react-google-charts";
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const octokit = new Octokit({
  auth: `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`,
});

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      python: 0,
      javascript: 0,
      html: 0,
      css: 0,
      ruby: 0,
      java: 0,
      php: 0,
      allData: [],
    };
  }

  componentDidMount() {
    this._getDataApi();
  }

  _getDataApi = async () => {
    fetch("https://tigermotoo.com/bigquery/index.php")
      .then((response) => response.json())
      .then((data) =>
        this.setState({ allData: data }, () => {
          this._updateAllData();
        })
      );
  };

  _updateAllData = () => {
    if (this.state.allData.length !== 0) {
      const data = this.state.allData;

      let temp = [];
      temp.push(["Language", "Repository Count", { role: "style" }]);
      data.forEach((item) =>
        temp.push([item.repository_language, item.pushes, "red"])
      );
      this.setState({ allData: temp }, () => {
        console.log(this.state.allData);
      });
    }
  };

  render() {
    const options = {
      title: "Language vs. Repo Count",
      hAxis: { title: "Language", viewWindow: { min: 0 } },
      vAxis: { title: "Repo Count", viewWindow: { min: 0 } },
      legend: "none"
    };
    return (
      <div className="container">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="600px"
          data={this.state.allData}
          options={options}
        />
      </div>
    );
  }
}

export default App;
