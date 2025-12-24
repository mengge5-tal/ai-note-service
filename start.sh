#!/bin/bash

# 一键启动脚本 - 同时启动后端和前端服务

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

# 进程 ID 存储
BACKEND_PID=""
FRONTEND_PID=""

# 清理函数
cleanup() {
    echo -e "\n${YELLOW}正在关闭服务...${NC}"
    
    if [ ! -z "$BACKEND_PID" ]; then
        echo -e "${BLUE}关闭后端服务 (PID: $BACKEND_PID)${NC}"
        kill $BACKEND_PID 2>/dev/null || true
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        echo -e "${BLUE}关闭前端服务 (PID: $FRONTEND_PID)${NC}"
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    
    # 等待进程完全退出
    sleep 1
    
    # 强制清理（如果还有残留）
    pkill -f "go run main.go" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    
    echo -e "${GREEN}所有服务已关闭${NC}"
    exit 0
}

# 捕获退出信号
trap cleanup SIGINT SIGTERM

# 检查依赖
check_dependencies() {
    echo -e "${BLUE}检查依赖...${NC}"
    
    if ! command -v go &> /dev/null; then
        echo -e "${RED}错误: 未找到 Go，请先安装 Go${NC}"
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}错误: 未找到 Node.js，请先安装 Node.js${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}错误: 未找到 npm，请先安装 npm${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}依赖检查通过${NC}"
}

# 检查目录和文件
check_directories() {
    if [ ! -d "$BACKEND_DIR" ]; then
        echo -e "${RED}错误: 后端目录不存在: $BACKEND_DIR${NC}"
        exit 1
    fi
    
    if [ ! -d "$FRONTEND_DIR" ]; then
        echo -e "${RED}错误: 前端目录不存在: $FRONTEND_DIR${NC}"
        exit 1
    fi
    
    if [ ! -f "$BACKEND_DIR/main.go" ]; then
        echo -e "${RED}错误: 后端 main.go 不存在${NC}"
        exit 1
    fi
    
    if [ ! -f "$FRONTEND_DIR/package.json" ]; then
        echo -e "${RED}错误: 前端 package.json 不存在${NC}"
        exit 1
    fi
}

# 启动后端服务
start_backend() {
    echo -e "${BLUE}启动后端服务...${NC}"
    cd "$BACKEND_DIR"
    
    # 检查配置文件
    if [ ! -f "config.yaml" ]; then
        echo -e "${YELLOW}警告: config.yaml 不存在，使用默认配置${NC}"
    fi
    
    # 在后台启动 Go 服务
    go run main.go > /tmp/backend.log 2>&1 &
    BACKEND_PID=$!
    
    echo -e "${GREEN}后端服务已启动 (PID: $BACKEND_PID)${NC}"
    echo -e "${BLUE}后端日志: tail -f /tmp/backend.log${NC}"
    
    # 等待后端启动
    sleep 2
    
    # 检查后端是否成功启动
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo -e "${RED}错误: 后端服务启动失败${NC}"
        echo -e "${YELLOW}后端日志:${NC}"
        cat /tmp/backend.log
        exit 1
    fi
    
    cd "$SCRIPT_DIR"
}

# 启动前端服务
start_frontend() {
    echo -e "${BLUE}启动前端服务...${NC}"
    cd "$FRONTEND_DIR"
    
    # 检查 node_modules
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}未找到 node_modules，正在安装依赖...${NC}"
        npm install
    fi
    
    # 在后台启动前端服务
    npm run dev > /tmp/frontend.log 2>&1 &
    FRONTEND_PID=$!
    
    echo -e "${GREEN}前端服务已启动 (PID: $FRONTEND_PID)${NC}"
    echo -e "${BLUE}前端日志: tail -f /tmp/frontend.log${NC}"
    
    # 等待前端启动
    sleep 3
    
    # 检查前端是否成功启动
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo -e "${RED}错误: 前端服务启动失败${NC}"
        echo -e "${YELLOW}前端日志:${NC}"
        cat /tmp/frontend.log
        cleanup
        exit 1
    fi
    
    cd "$SCRIPT_DIR"
}

# 显示服务信息
show_info() {
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  服务启动成功！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${BLUE}后端服务:${NC}"
    echo -e "  - PID: $BACKEND_PID"
    echo -e "  - 地址: http://localhost:8080"
    echo -e "  - 日志: tail -f /tmp/backend.log"
    echo ""
    echo -e "${BLUE}前端服务:${NC}"
    echo -e "  - PID: $FRONTEND_PID"
    echo -e "  - 地址: http://localhost:5173 (Vite 默认端口)"
    echo -e "  - 日志: tail -f /tmp/frontend.log"
    echo ""
    echo -e "${YELLOW}按 Ctrl+C 停止所有服务${NC}"
    echo ""
}

# 主函数
main() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  一键启动脚本${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    
    check_dependencies
    check_directories
    start_backend
    start_frontend
    show_info
    
    # 保持脚本运行，等待用户中断
    while true; do
        # 检查进程是否还在运行
        if [ ! -z "$BACKEND_PID" ] && ! kill -0 $BACKEND_PID 2>/dev/null; then
            echo -e "${RED}后端服务意外退出${NC}"
            cleanup
            exit 1
        fi
        
        if [ ! -z "$FRONTEND_PID" ] && ! kill -0 $FRONTEND_PID 2>/dev/null; then
            echo -e "${RED}前端服务意外退出${NC}"
            cleanup
            exit 1
        fi
        
        sleep 2
    done
}

# 运行主函数
main

