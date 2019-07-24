import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import './searchCheckboxes.css';

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
        const categories = ['pie','bread', 'cake', 'cheesecake', 'cupcake', 'ice cream', 'brownie', 'cookie', 'cobbler', 'chocolate', 'fruit', 'caramel', 'other' ].sort();
        return (
            <div className='container center'>
                <Form>
                    <div className='row category-rows'>
                        {categories.map((category) => {
                            return (
                              
                                <div className='checkbox' key={category}>
                                
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
                <hr/>
            </div>
        )
    }
}
export default SearchCheckboxes;
