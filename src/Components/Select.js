import React from "react";
import "./css/select.css";

class Select extends React.Component {
  state = {
    name: ""
  };

  generateList = value => {
    // console.log(value);
    if (value != null) {
      return value.map((item, i) => {
        return (
          <option key={i} value={item}>
            {item}
          </option>
        );
      });
    }
  };

  handleChange = event => {
    console.log(event.target.value);
    this.props.valueChange(event.target.value);
  };
  render() {
    return (
      <div className="tag">
        <select onChange={this.handleChange}>
          <option key={0} value={null}>
            Select
          </option>
          {this.generateList(this.props.list)}
        </select>
        {/* {console.log(this.props)} */}
      </div>
    );
  }
}
export default Select;

// const Select = (props) => {
//     const list = props.list.map((item) => {
//         return <option key={item} value={item}>{item}</option>
//     });
//     return <select>{list}</select>
// };

// class Select extends React.Component {
//     state = {
//         stateList: [],
//         districtList: [],
//         blockList: [],
//         stateName: "",
//         districtName: "",
//         blockName: ""
//     }
//     componentDidMount() {
//         this.stateListCreate();
//         this.districtListCreate();
//         this.blockListCreate();
//       }
//     stateListCreate = async () => {
//         let res = await axios.get('http://localhost:8000/utils/');
//         let data = res.data;
//         this.setState({
//             stateList: data.map((item, i) => (
//               <option key={i} value={item}>{item}</option>
//             ))
//         });
//     }
//     districtListCreate = async (value) => {
//         // console.log(value.target.value);
//         // this.setState({stateName: value});
//         console.log(`http://localhost:8000/utils/${this.state.stateName}/`);
//         let res = await axios.get(`http://localhost:8000/utils/${this.state.stateName}/`);
//         let data = res.data;
//         this.setState({
//             districtList: data.map((item, i) => (
//               <option key={i} value={item}>{item}</option>
//             ))
//         });
//     }
//     blockListCreate = async (value) => {
//         // this.setState({districtName: value});
//         let res = await axios.get(`http://localhost:8000/utils/${this.state.stateName}/${this.state.districtName}/`);
//         let data = res.data;
//         this.setState({
//             blockList: data.map((item, i) => (
//               <option key={i} value={item}>{item}</option>
//             ))
//         });
//     }
//     handleStateChange = async (value) => {
//         await this.setState({stateName: value.target.value});
//         this.districtListCreate();
//     }
//     handleDistrictChange = async (value) => {
//         await this.setState({districtName: value.target.value});
//         this.blockListCreate();
//     }
//     render() {
//         return(
//             <div>
//                 <select className="state" onChange={this.handleStateChange}>{this.state.stateList}</select>
//                 <br /><select className="district" onChange={this.handleDistrictChange}>{this.state.districtList}</select>
//                 <br /><select className="block">{this.state.blockList}</select>
//             </div>
//         );
//     }
// }
