import React, {
    Component,
    PropTypes,
} from 'react';

class OptionMenu extends Component {
    renderItems() {
        return this.props.data.map(function (item, index) {
            return <option key={`option-${index}`} value={item.value}>{item.label}</option>;
        });
    }
    render() {
        const {onChange} = this.props;
        return (
            <select style={{height:"20%"}}
                    className="form-control"
                    multiple={true}
                    onChange={onChange}>
                {this.renderItems()}
            </select>
        );
    }
}

OptionMenu.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
    })).isRequired,
    onChange: PropTypes.func.isRequired
};
OptionMenu.defaultProps = {};

export default OptionMenu;
