@echo off
setlocal EnableDelayedExpansion

REM set variables
set i=0
for /f "tokens=2 delims==" %%d in ('wmic logicaldisk where "drivetype=3" get name /format:value') do (
 set /A i+=1
 set list[!i!]=%%d
)
set lac=E:\repositories\reuse\Cake v.18\lac
set msbuild="%programfiles(x86)%\Microsoft Visual Studio\2017\Enterprise\MSBuild\15.0\Bin\MSBuild.exe"

REM copy all dependences
echo Copying all dependencies...
md ".\lac\"

copy "%lac%\Cake.Services.Core.dll" ".\lac\"
copy "%lac%\Cake.ConnectionFactory.dll" ".\lac\"
copy "%lac%\Cake.EngineManagement.dll" ".\lac\"

REM Build Skcalability Solution
echo Build Doorway...
%msbuild% Doorway.sln /p:Configuration=Debug;Platform="Any CPU"

pause