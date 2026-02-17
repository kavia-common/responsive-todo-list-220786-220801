#!/bin/bash
cd /home/kavia/workspace/code-generation/responsive-todo-list-220786-220801/todo_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

