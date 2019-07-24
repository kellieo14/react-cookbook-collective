import React, {Component} from 'react';
import {InputGroup, FormControl, Form} from 'react-bootstrap';
import './searchBar.css'
import SearchCheckBoxes from '../searchCheckboxes/SearchCheckboxes';


class SearchBar extends Component {
        constructor(props){
        super(props);
        this.state = {
            searchType: ''
        }
    }
    handleCategory = (e) => {
        const searchType = e.target.value;
        this.setState({ searchType })
        this.props.updateParameter(searchType);
    }

    render() {
        

        return (
                <div className='search-bar-div'>
 
                    <InputGroup className='search-bar center'>
                        {this.state.searchType === 'categories' && (
                            <FormControl
                            disabled
                                placeholder='Search...'
                                aria-label='Search'
                                className='search'
                                onChange={this.props.updateSearch}
                            />
                        )}
                        {this.state.searchType !== 'categories' && (
                            <FormControl
                                placeholder='Search...'
                                aria-label='Search'
                                className='search'
                                onChange={this.props.updateSearch}
                            />

                        )}
    
                        <InputGroup.Append>
                        <InputGroup.Text className='input-text'>in:</InputGroup.Text>
                        <Form.Control className='parameter-values' as="select" onChange={this.handleCategory}>
                            <option value='title'>Title</option>
                            <option value='author'>Author</option>
                            <option value='categories'>Category</option>
                        </Form.Control>
                        </InputGroup.Append>

                    
                    </InputGroup>
                    <div className='center'>
                    {this.state.searchType === 'categories' && (
                        <SearchCheckBoxes 
                            handleCategoryChange={this.props.handleCategoryChange}
                        />
                    )}
                    </div>
                </div>
        )
    }
}

export default SearchBar;



// import React, {Component} from 'react';
// import {InputGroup, FormControl, Form} from 'react-bootstrap';
// import './searchBar.css'
// import SearchCheckBoxes from '../searchCheckboxes/SearchCheckboxes';


// class SearchBar extends Component {
//         constructor(props){
//         super(props);
//         this.state = {
//             searchType: ''
//         }
//     }
//     handleCategory = (e) => {
//         const searchType = e.target.value;
//         this.setState({ searchType })
//         this.props.updateParameter(searchType);
//     }

//     render() {
        

//         return (
//                 <div>
//                 <div>
                
//                 </div>
//                     <InputGroup>
//                         {this.state.searchType === 'categories' && (
//                             <FormControl
//                             disabled
//                                 placeholder='Search...'
//                                 aria-label='Search'
//                                 className='search'
//                                 onChange={this.props.updateSearch}
//                             />
//                         )}
//                         {this.state.searchType !== 'categories' && (
//                             <FormControl
                            
//                                 placeholder='Search...'
//                                 aria-label='Search'
//                                 className='search'
//                                 onChange={this.props.updateSearch}
//                             />

//                         )}
    
//                         <InputGroup.Append>
//                         <InputGroup.Text className='input-text'>in:</InputGroup.Text>
//                         <Form.Control className='parameter-values' as="select" onChange={this.handleCategory}>
//                             <option value='title'>Title</option>
//                             <option value='author'>Author</option>
//                             <option value='categories'>Category</option>
//                         </Form.Control>
//                         </InputGroup.Append>

//                         {this.state.searchType === 'categories' && (
//                             <SearchCheckBoxes 
//                                 handleCategoryChange={this.props.handleCategoryChange}
//                             />
//                         )}
                    
//                     </InputGroup>
//                 </div>
//         )
//     }
// }

// export default SearchBar;