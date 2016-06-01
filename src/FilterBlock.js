import React, {
    Component,
    PropTypes,
} from 'react';
import _ from 'lodash';

import OptionMenu from './OptionMenu';

class FilterBlock extends Component {
    // Pass up an array of Sectors to filter by for Summary and Table
    // components
    onChange(event) {
        const options = event.target.options;

        const filters = _.chain(options)
            .filter(function (option) {
                return option.selected;
            })
            .map(function (option) {
                return option.value;
            })
            .value();

        this.props.setFilters(filters);
    }
    // Create the unique list of options for filters
    // output it in array<object> so that OptionMenu
    // recognizes it
    filterData(data) {
        return _.chain(data)
            .map((row) => {
                return row[this.props.field]
            })
            .uniq()
            .map(function (row) {
                return {
                    value: row,
                    label: row
                };
            })
            .value()
    }
    render() {
        if (this.props.isLoaded === false) {
            return <div>Loading...</div>
        }
        const filteredData = this.filterData(this.props.data);

        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <OptionMenu onChange={this.onChange.bind(this)}
                                    data={filteredData}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

FilterBlock.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    field: PropTypes.string.isRequired,
    setFilters: PropTypes.func.isRequired
};
FilterBlock.defaultProps = {};

export default FilterBlock;
