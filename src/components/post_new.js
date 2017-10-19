import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component {
  renderField(field) {
    console.log(field)
    return (
      <div>
        <label>{field.label}</label>
        <input
          type="text"
          {...field.input}
        />
        {field.meta.touched ? field.meta.error : ''}
      </div>
    );
  }

  onSubmit(values) {
      this.props.createPost(values, () => {
        this.props.history.push('/');
      });
  }

  render() {
    const { handleSubmit } = this.props;
    // Call the callback onSubmit after handleSubmit
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if( !values.title ) {
    errors.title = "Enter a title";
  }
  // If errors is empty ok to submit
  // If has any property, redux assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostNew)
);
