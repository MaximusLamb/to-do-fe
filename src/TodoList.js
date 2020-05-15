import React, { Component } from 'react';
import request from 'superagent';

export default class TodoList extends Component {

    state = {
        todo: [],
        newToDo: '',
        completed: false

    }

    async componentDidMount() {
        const data = await request.get('http://localhost:3000/api/todo')
        this.setState({ todo: data.body })
    }

    getClassName = (task) => {
        if (task.completed) return 'complete';
        if (!task.completed) return 'incomplete';
    }

    handleChange = async (e) => {
        await this.setState({ newTodo: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const thing = {

            todo: '',
            completed: false

        }

        const fetchedData = await request.post('http//localhost:3000/api/new', thing).set("authorization", this.props.token)

        this.setState({ newToDo: fetchedData.body})

        const freshTodoList = this.state.todo.slice();
        
        console.log(fetchedData.body)
        this.setState({ todo: freshTodoList.body})

    }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}
