import React, {Component} from 'react';
import {Pagination} from 'react-bootstrap';
import './pager.css';

class Pager extends Component {

    render () {
        return (
            <div className='center pager-container'>
                <Pagination className='pager' >
                    <Pagination.First className={(this.props.currentPage === 1) ? 'disabled' : ''}onClick={() => this.props.makeHttpRequestWithPage(1)}>{}</Pagination.First>
                    <Pagination.Prev className={(this.props.currentPage === 1) ? 'disabled' : ''} onClick={() => this.props.makeHttpRequestWithPage(this.props.currentPage - 1)}>{}</Pagination.Prev>
                    {this.props.pagerNumbers.map((page) => 
                        <Pagination.Item  key={page} onClick={() => {this.props.makeHttpRequestWithPage(page)}} className={(page === this.props.currentPage) ? 'active' : ''}>{page}</Pagination.Item>
                    )}
                    <Pagination.Next className={(this.props.currentPage === this.props.pageCount) ? 'disabled' : ''} onClick={() => this.props.makeHttpRequestWithPage(this.props.currentPage + 1)}>{}</Pagination.Next>
                    <Pagination.Last className={(this.props.currentPage === this.props.pageCount) ? 'disabled' : ''} onClick={() => this.props.makeHttpRequestWithPage(this.props.pageCount)}>{}</Pagination.Last>    
                </Pagination>
            </div>
        )
    }
}

export default Pager;
