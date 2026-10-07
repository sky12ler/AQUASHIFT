@echo off
title AQUASHIFT Local Prototype
start "" "http://localhost:8080"
node "%~dp0server.cjs"
pause
