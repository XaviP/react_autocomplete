import React from 'react'
import axios from 'axios'
import Autocomplete from  'react-autocomplete'

class CustomAutocomplete extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      matchingValues: []
    }
  }

  getData(searchText) {
    return axios
      .get('http://api.iskra.cat/suggestions?term=' + searchText)
      .then(function (response) {
        if (!response) {
          return []
        }
        return response.data.data
      })
    // var recievedMatchingValues = {
    //   'count': 3,
    //   'data': ['suggestion textbox', 'suggestion textbox javascript', 'suggestion textbox jquery']
    // }
    // return recievedMatchingValues.data

  }

  render() {
    return (
      <div className="CustomAutocomplete">
        <Autocomplete
          getItemValue={(item) => item}
          items={this.state.matchingValues}
          renderItem={(item) =>
            <div>{item}</div>
          }
          value={this.state.value}
          onChange={(event, value) => {
            this.setState({ value })
            this.setState({ matchingValues: this.getData(value) })
          }}
          onSelect={(value, item) => {
            this.setState({ value, matchingValues: [ item ] })
          }}
        />
      </div>
    );
  }
}

export default CustomAutocomplete;
