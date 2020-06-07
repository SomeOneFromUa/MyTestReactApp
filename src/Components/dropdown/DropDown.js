import React ,{Component} from "react";


export class DropDown extends Component{
    state = {
       isOpen: false
    };

    toogle = ()=>{
        this.setState({
            isOpen: !this.state.isOpen
        })
    };
    onSelect = (event)=>{
        const {onSelectFoo} = this.props;
        const option = event.target.getAttribute('data');
        onSelectFoo(option);
        this.setState({
            isOpen: false
        })
    }
    render() {
        const {isOpen} =  this.state;
        const {items, selectedItem, options} = this.props;
        return (
                <div className='dropdown'>
                    <div className='dropdown-toggle' onClick={this.toogle}>{selectedItem}</div>
                    {isOpen &&  <div className='dropdown-menu show'>
                        {options.map((option)=>{
                            return (
                                <div className={`dropdown-item ${selectedItem === option? 'active': ''}`}
                                onClick={this.onSelect}
                                     data={option}
                                     key={option}
                                >
                                    {option}
                                </div>
                            )

                        }) }

                    </div>}


            </div>

        );
    }
}