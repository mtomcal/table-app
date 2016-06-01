import React, {
    Component,
    PropTypes,
} from 'react';
import _ from 'lodash';

class Table extends Component {
    renderColumnHeaders() {
        return _.chain(this.props.data[0])
            .pick(this.props.displayFields)
            .keys()
            .map(function (key, index) {
                return <th key={`th-${index}`}>{key}</th>;
            })
            .value();

    }

    renderRowData() {
        return this.props.data.map((row, rowIndex) => {
            return <tr key={`tr-${rowIndex}`}>
                {_.chain(row)
                    .pick(this.props.displayFields)
                    .keys()
                    .map(function (col, colIndex) {
                        return <td key={`td-${colIndex}`}>{row[col]}</td>;
                    })
                    .value()}
            </tr>;
        });
    }

    render() {
        if (this.props.isLoaded === false) {
            return <div>Loading...</div>;
        }
        return (
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        {this.renderColumnHeaders()}
                    </tr>
                </thead>
                <tbody>
                    {this.renderRowData()}
                </tbody>
            </table>
        );
    }
}

Table.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    displayFields: PropTypes.arrayOf(PropTypes.string).isRequired
};
Table.defaultProps = {};

export default Table;
