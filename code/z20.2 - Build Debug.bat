@echo off

SET STARTTIME=%TIME%
echo Start: %STARTTIME%
REM ******************************************************
echo Start Build 
Set msb="%programfiles(x86)%\Microsoft Visual Studio\2019\Community\MSBuild\Current\Bin\MSBuild.exe"
%msb% /nologo /t:Build /p:Configuration=Debug;Platform=x86 build.proj

REM ******************************************************

REM TIME DURATION
SET ENDTIME=%TIME%
echo Finish: %ENDTIME%

FOR /F "tokens=1-4 delims=:.," %%a IN ("%STARTTIME%") DO (
   SET /A "start=(((%%a*60)+1%%b %% 100)*60+1%%c %% 100)*100+1%%d %% 100"
)

FOR /F "tokens=1-4 delims=:.," %%a IN ("%ENDTIME%") DO (
   SET /A "end=(((%%a*60)+1%%b %% 100)*60+1%%c %% 100)*100+1%%d %% 100"
)

REM Calculate the elapsed time by subtracting values
SET /A elapsed=end-start

REM Format the results for output
SET /A hh=elapsed/(60*60*100), rest=elapsed%%(60*60*100), mm=rest/(60*100), rest%%=60*100, ss=rest/100, cc=rest%%100
IF %hh% lss 10 SET hh=0%hh%
IF %mm% lss 10 SET mm=0%mm%
IF %ss% lss 10 SET ss=0%ss%
IF %cc% lss 10 SET cc=0%cc%
SET DURATION=%hh%:%mm%:%ss%,%cc%

ECHO Start    : %STARTTIME%
ECHO Finish   : %ENDTIME%
ECHO          ---------------
ECHO Duration : %DURATION%

pause