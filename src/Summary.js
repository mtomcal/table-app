import React, {
    Component,
    PropTypes,
} from 'react';

import _ from 'lodash';

import Table from './Table';

class Summary extends Component {
    render() {
        if (this.props.isLoaded === false) {
            return <div>Loading...</div>;
        }

        var marketCapTotals = _.chain(this.props.data)
            .map(function (row, rowIndex) {
                return row["Market Cap"];
            })
            .reduce(function (acc, x) {
                return acc + Number(x);
            }, 0.00)
            .value();

        var totalCompanies = this.props.data.length;

        var data = [{
            "Total Companies": totalCompanies,
            "Market Cap Sum": marketCapTotals.toFixed(2)
        }];

        return (
            <Table isLoaded={true} data={data} displayFields={_.keys(data[0])} />
        );
    }
}

Summary.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    displayFields: PropTypes.arrayOf(PropTypes.string).isRequired
};

Summary.defaultProps = {};

export default Summary;
