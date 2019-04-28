set MAIN_JS=%~dp0\user_server\app.js
set CONFIG=%~dp0\config.js
call node.exe %MAIN_JS% %CONFIG%
pause