import React from "react";
export default class EventCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      itemsAdded: 0
    };
  }

  componentDidMount() {
    this.getWorkItems().then(data => {
      this.setState({ content: JSON.stringify(data) });
    });
  }

  addWorkItem = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/workItem", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: "url",
        title: "title",
        description: "description",
        status: "working"
      })
    });
    const data = res.json();
    console.log(data);
    this.setState({ itemsAdded: this.state.itemsAdded + 1 });
  };

  getWorkItems = () => {
    return fetch("http://localhost:8000/workItems")
      .then(resp => resp.json()) // Transform the data into json
      .then(function(data) {
        return data;
      });
  };

  render() {
    return (
      <div>
        {this.state.content}
        <div>
          <form>
            <button type="submit" onClick={this.addWorkItem}>
              Add a work item
            </button>
          </form>
        </div>
      </div>
    );
  }
}
