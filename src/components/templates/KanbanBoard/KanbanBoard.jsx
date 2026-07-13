import React, { useState } from 'react';
import { Plus, MoreHorizontal, MessageSquare, Paperclip, Clock } from 'lucide-react';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge/Badge';
import { Avatar } from '../../molecules/AvatarGroup/AvatarGroup';
import './KanbanBoard.scss';

export const KanbanBoard = ({
  initialTasks = [
    { id: 1, column: 'todo', title: 'Database Schema Updates', desc: 'Implement schema modifications and migrations for client profiles.', priority: 'danger', comments: 4, attachments: 2, date: 'Jul 15', user: 'Alexander Wright' },
    { id: 2, column: 'todo', title: 'User Settings Tab Refactor', desc: 'Move theme variables toggles into a separate tab menu panel.', priority: 'warning', comments: 1, attachments: 0, date: 'Jul 18', user: 'Jane Smith' },
    { id: 3, column: 'inprogress', title: 'Drag and Drop File Dropzone', desc: 'Write component logic with uploading state indicators.', priority: 'primary', comments: 8, attachments: 3, date: 'Jul 12', user: 'John Doe' },
    { id: 4, column: 'review', title: 'E2E Validation Test Suites', desc: 'Write testing assertions for onboarding submission forms.', priority: 'info', comments: 3, attachments: 1, date: 'Jul 10', user: 'Jane Smith' },
    { id: 5, column: 'done', title: 'Auth Password Meter UI', desc: 'Add visual strength estimate meters under auth fields.', priority: 'success', comments: 2, attachments: 1, date: 'Jul 05', user: 'Alexander Wright' }
  ],
  columns = [
    { id: 'todo', label: 'To Do' },
    { id: 'inprogress', label: 'In Progress' },
    { id: 'review', label: 'In Review' },
    { id: 'done', label: 'Completed' }
  ],
  className = '',
  ...props
}) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showQuickAdd, setShowQuickAdd] = useState(null); // column id
  const [newTitle, setNewTitle] = useState('');

  const handleAddTask = (columnId) => {
    if (!newTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      column: columnId,
      title: newTitle,
      desc: 'Quickly created task item.',
      priority: 'primary',
      comments: 0,
      attachments: 0,
      date: 'Today',
      user: 'Alexander Wright'
    };
    setTasks(prev => [...prev, newTask]);
    setNewTitle('');
    setShowQuickAdd(null);
  };

  const moveTask = (taskId, nextColumn) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, column: nextColumn } : t))
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'danger': return 'danger';
      case 'warning': return 'warning';
      case 'success': return 'success';
      case 'info': return 'info';
      default: return 'primary';
    }
  };

  return (
    <div className={`kanban-board-wrapper ${className}`} {...props}>
      <div className="kanban-board-columns-grid">
        {columns.map((col) => {
          const colTasks = tasks.filter(t => t.column === col.id);

          return (
            <div key={col.id} className="kanban-column">
              <div className="kanban-column-header">
                <div className="column-header-title-row">
                  <span className="column-label">{col.label}</span>
                  <span className="column-count-badge">{colTasks.length}</span>
                </div>
                <button type="button" className="column-actions-btn">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div className="kanban-cards-stack">
                {colTasks.map((task) => (
                  <div key={task.id} className="kanban-task-card">
                    <div className="card-top-row">
                      <Badge variant="soft" color={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      {/* Simple move options */}
                      <select
                        className="task-move-select"
                        value={task.column}
                        onChange={(e) => moveTask(task.id, e.target.value)}
                      >
                        {columns.map(c => (
                          <option key={c.id} value={c.id}>Move: {c.label}</option>
                        ))}
                      </select>
                    </div>

                    <h5 className="task-card-title">{task.title}</h5>
                    <p className="task-card-desc">{task.desc}</p>

                    <div className="task-card-footer">
                      <div className="task-card-meta-icons">
                        {task.comments > 0 && (
                          <span className="meta-icon-item">
                            <MessageSquare size={13} /> {task.comments}
                          </span>
                        )}
                        {task.attachments > 0 && (
                          <span className="meta-icon-item">
                            <Paperclip size={13} /> {task.attachments}
                          </span>
                        )}
                        <span className="meta-icon-item">
                          <Clock size={13} /> {task.date}
                        </span>
                      </div>
                      <Avatar name={task.user} size="sm" />
                    </div>
                  </div>
                ))}

                {showQuickAdd === col.id ? (
                  <div className="kanban-quick-add-box">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Enter task title..."
                      autoFocus
                      className="quick-add-input"
                    />
                    <div className="quick-add-buttons">
                      <Button variant="ghost" size="sm" onClick={() => setShowQuickAdd(null)}>
                        Cancel
                      </Button>
                      <Button variant="solid" size="sm" onClick={() => handleAddTask(col.id)}>
                        Add
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => setShowQuickAdd(col.id)}
                    leftIcon={<Plus size={16} />}
                    className="add-task-ghost-btn"
                  >
                    Add Task Card
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default KanbanBoard;
