@echo off
title CyberShield Security Platform
color 0B
echo ======================================================================
echo                 CYBERSHIELD SECURITY PLATFORM                      
echo ======================================================================
echo.
echo Starting CyberShield App...
set PATH=%PATH%;C:\Users\Shlok Tripathi\AppData\Local\Programs\nodejs;%APPDATA%\npm
cd /d "C:\Users\Shlok Tripathi\.gemini\antigravity\scratch\cybershield"

start msedge http://localhost:5173 http://localhost:3003

npm run dev
