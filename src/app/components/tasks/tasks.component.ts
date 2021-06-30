import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../../services/task-service.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskServiceService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks)); //subscribing to an observable
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTasks(task)
      .subscribe(
        (tasks) => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    console.log('toggle', task.reminder);
    this.taskService.updateTaskReminder(task).subscribe();
  }
  addTask(task: Task) {
    console.log('adding task', task);
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
}
