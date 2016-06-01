import React, {
    Component,
    PropTypes,
} from 'react';
import _ from 'lodash';
import request from 'superagent';
import Table from './Table';
import Summary from './Summary';
import FilterBlock from './FilterBlock';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            filters: [],
            displayFields: [""],
            data: []
        }
    }
    // Hook for setting filters on state
    setFilters(filters) {
        var nextState = _.assign({}, this.state);
        nextState.filters = filters;
        this.setState(nextState);
    }
    // Transformer of state when filters exist without
    // mutating the actual data array
    applyFilters(state) {
        if (_.isEmpty(state.filters)) {
            return state;
        }

        var nextState = _.assign({}, state);

        nextState.data = _.chain(state.data)
            .filter(function (row) {
                return _.includes(state.filters, row["Sector"])
            })
            .value();

        return nextState;
    }
    componentDidMount() {
        // Retrieve data and populate state
        request
            .get(`http://data.okfn.org/data/core/s-and-p-500-companies/r/constituents-financials.json`)
            .end((error, result) => {
                this.setState({
                    isLoaded: true,
                    displayFields: ['Name', 'Sector', 'Market Cap'],
                    data: result.body
                })
            });
    }
    render() {
        const {applyFilters, setFilters} = this;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Filters</h2>
                        <FilterBlock {...this.state}
                            field="Sector"
                            setFilters={setFilters.bind(this)} />
                        <h2>Summary</h2>
                        <Summary {...applyFilters(this.state)} />
                        <h2>Companies</h2>
                        <Table {...applyFilters(this.state)}/>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;

