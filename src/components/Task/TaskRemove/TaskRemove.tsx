import React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

import { Task, Auth } from '../../../fixtures/types';
import { MODAL_SIZE } from '../../../fixtures/constants';
import { DEFAULT } from '../../../fixtures/routes';
import { getTask, deleteTask } from '../../../store/actions';
import { Modal, Button } from '../../index';

export interface Props {
  projectId: string;
  id: string;
  task: Task;
  auth: Auth;
  history: History;

  getTask: (id: string, projectId: string) => void;
  deleteTask: (id: string, projectId: string) => void;
}

class TaskRemove extends React.Component<Props> {
  public componentDidMount() {
    this.props.getTask(this.props.id, this.props.projectId);
  }

  private handleSubmit = () => {
    this.props.deleteTask(this.props.id, this.props.projectId);

    this.props.history.goBack();
  };

  private handleCancel = () => this.props.history.goBack();

  private get actionButtons() {
    return (
      <React.Fragment>
        <Button label="Ok" className="negative" onClick={this.handleSubmit} />
        <Button label="Cancel" onClick={this.handleCancel} />
      </React.Fragment>
    );
  }

  public render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to={DEFAULT} />;

    return !this.props.task ? (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading task</div>
      </div>
    ) : (
      <Modal
        header="Delete Task"
        content="Are you sure you want to delete this task?"
        actionButtons={this.actionButtons}
        history={this.props.history}
        size={MODAL_SIZE.MINI}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const projectPathname = ownProps.location.pathname;
  //@todo: Refactoring this
  const projectId = projectPathname.substring(0, projectPathname.lastIndexOf('/task')).replace('/project/', '');
  const id = ownProps.match.params.id;
  const tasks = state.firestore.data.tasks;
  const task = tasks ? tasks[id] : null;

  return {
    projectId,
    task,
    id,
    auth: state.firebase.auth
  };
};

export default compose(
  //todo: Add type
  firestoreConnect((props: any) => {
    const projectPathname = props.location.pathname;
    //@todo: Refactoring this
    const projectId = projectPathname.substring(0, projectPathname.lastIndexOf('/task')).replace('/project/', '');

    return [
      {
        collection: 'projects',
        doc: projectId,
        subcollections: [{ collection: 'tasks' }],
        storeAs: 'tasks'
      }
    ];
  }),
  connect(mapStateToProps, { getTask, deleteTask })
)(TaskRemove) as React.ComponentType;
