set ROUTERPASSWORD=doremi
set ROUTERIP=10.20.0.1

setlocal ENABLEDELAYEDEXPANSION

set FILE_1=wol.html
set FILE_2=wol.js
set FILE_3=ping.lua
set FILE_4=pclist.js

set i=1
:BEGIN
call set FILE=%%FILE_!i!%%
if defined FILE (
  tftp %ROUTERIP% put %FILE% /%FILE%/%ROUTERPASSWORD%
  set /A i+=1
  goto :BEGIN
)

pause