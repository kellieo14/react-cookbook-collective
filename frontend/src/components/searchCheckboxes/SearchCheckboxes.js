import React, {Component} from 'react';
import {Form} from 'react-bootstrap';

class SearchCheckboxes extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            searchCategory: []
        }
    }

    handleUpdateSearchCategory = () => {
        const searchCategory= [];
        let category = document.getElementsByClassName('category');
        for (let i = 0; i < category.length; i++) {
            if (category[i].checked) {
                searchCategory.push(category[i].value);
                // this.props.handleCategoryChange(searchCategory)
            }
        }

        this.setState({ searchCategory })
        this.props.handleCategoryChange(searchCategory);
    }


    render() {
        const categories = ['pie', 'cake', 'cheesecake', 'cupcake', 'ice cream', 'brownie', 'cookie', 'cobbler', 'chocolate', 'fruit', 'caramel', 'other' ].sort();
        return (
            <div className='container'>
                <Form>
                    <div className='row category-rows'>
                        {categories.map((category) => {
                            return (
                                <div className='col-xs-6 col-md-3 col-lg-2 ml-3' key={category}>
                                    <label>
                                        <input
                                            type='checkbox'
                                            name={category}
                                            value={category}
                                            className='category'
                                            onChange = {this.handleUpdateSearchCategory}
                                        />
                                    {`     ` + category}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </Form>
            </div>
        )
    }
}
export default SearchCheckboxes;
