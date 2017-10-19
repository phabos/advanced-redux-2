import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions/index';
import { Link } from 'react-router-dom';

class PostShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }
  onDeleteClick() {
      const { id } = this.props.match.params;
      this.props.deletePost(id, () => {
        this.props.history.push('/');
      });
  }
  render() {
    const { post } = this.props;
    if(!post) {
        return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Retour</Link>
        <button
          onClick={this.onDeleteClick.bind(this)}
        >Delete post</button>
        {post.id} <br />
        {post.title} <br />
        {post.categories} <br />
        {post.content} <br />
      </div>
    );
  };
}

function mapStateToProps({posts}, ownProps) {
  return {
    post: posts[ownProps.match.params.id]
  };
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
