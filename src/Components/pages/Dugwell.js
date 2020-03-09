import React from "react";
import axios from "axios";
import Charts from "../Charts";
import Select from "../Select";
import Geo from "../Geo";
import "../css/dugwell.css";
import Header from "../Header";

class Dugwell extends React.Component {
  state = {
    stateList: [],
    districtlist: [],
    blockList: [],
    stateName: "",
    districtName: "",
    blockName: "",
    mi4: [],
    mi5: [],
    mi4_data: [],
    mi5_data: [],
    map_data: [],
    type: "state"
  };
  componentDidMount() {
    this.getStateList();
    // console.log("in CDM");
  }
  getStateList = async () => {
    let res = await axios.get("http://localhost:8000/utils/");
    let data = res.data;
    await this.setState({ stateList: data });
    res = await axios.get("http://localhost:8000/api/4/");
    data = res.data;
    await this.setState({
      mi4_data: data.total != null ? data : data.data
    });
    await this.setState({ mi4: data.data });
    res = await axios.get("http://localhost:8000/api/5/");
    data = res.data;
    await this.setState({
      mi5_data: data.total != null ? data : data.data
    });
    await this.setState({ mi5: data.data });
    await this.setState({ type: "state" });
    // res = await axios.get("http://localhost:8000/api/tstate");
    // data = res.data;
    // await this.setState({ map_data: data });
  };
  getDistrictList = async () => {
    let res = await axios.get(
      `http://localhost:8000/utils/${this.state.stateName}/`
    );
    let data = res.data;
    await this.setState({ districtList: data });
    res = await axios.get(
      `http://localhost:8000/api/4/${this.state.stateName}/`
    );
    data = res.data;
    await this.setState({
      mi4_data: data.total != null ? data : data.data
    });
    await this.setState({ mi4: data.data });
    res = await axios.get(
      `http://localhost:8000/api/5/${this.state.stateName}/`
    );
    data = res.data;
    await this.setState({
      mi5_data: data.total != null ? data : data.data
    });
    await this.setState({ mi5: data.data });
    await this.setState({ type: this.state.stateName });
  };
  getBlockList = async () => {
    let res = await axios.get(
      `http://localhost:8000/utils/${this.state.stateName}/${this.state.districtName}/`
    );
    let data = res.data;
    await this.setState({ blockList: data });
    res = await axios.get(
      `http://localhost:8000/api/4/${this.state.stateName}/${this.state.districtName}/`
    );
    data = res.data;
    // await this.setState({
    //   mi4_data: data.total != null ? data : data.data
    // });
    await this.setState({ mi4: data.data });
    res = await axios.get(
      `http://localhost:8000/api/5/${this.state.stateName}/${this.state.districtName}/`
    );
    data = res.data;
    // await this.setState({
    //   mi5_data: data.total != null ? data : data.data
    // });
    await this.setState({ mi5: data.data });
    console.log(this.state);
  };
  handleState = async value => {
    await this.setState({
      stateName: value,
      districtName: "",
      blockName: "",
      districtlist: [],
      blockList: [],
      type: "state"
    });
    this.getDistrictList();
  };
  handleDistrict = async value => {
    await this.setState({
      districtName: value,
      blockName: "",
      blockList: []
    });
    this.getBlockList();
  };
  handleBlock = async value => {
    await this.setState({ blockName: value });
    let res = await axios.get(
      `http://localhost:8000/api/4/${this.state.stateName}/${this.state.districtName}/${this.state.blockName}/`
    );
    let data = res.data;
    // await this.setState({
    //   mi4_data: data.total != null ? data : data.data
    // });
    await this.setState({ mi4: data.data });
    res = await axios.get(
      `http://localhost:8000/api/5/${this.state.stateName}/${this.state.districtName}/${this.state.blockName}/`
    );
    data = res.data;
    // await this.setState({
    //   mi5_data: data.total != null ? data : data.data
    // });
    await this.setState({ mi5: data.data });
    console.log(this.state);
  };
  render() {
    return (
      <>
        <Header head={"Dugwell Analytics"} />
        <div className="container">
          <div className="select">
            <div className="drop">
              <Select
                list={this.state.stateList}
                valueChange={this.handleState}
              />
              <br />
              <Select
                list={this.state.districtList}
                valueChange={this.handleDistrict}
              />
              <br />
              <Select
                list={this.state.blockList}
                valueChange={this.handleBlock}
              />
            </div>
          </div>
          <div className="charts">
            <Charts
              title={"Mi 4"}
              labels={Object.keys(this.state.mi4)}
              values={Object.values(this.state.mi4)}
            />
            <Charts
              title={"Mi 5"}
              labels={Object.keys(this.state.mi5)}
              values={Object.values(this.state.mi5)}
            />
          </div>
          {/* 
          <div className="maps">
            <Geo type={"state"} />
          </div> */}
        </div>
      </>
    );
  }
}

export default Dugwell;
