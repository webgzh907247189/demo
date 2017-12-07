# demo
this is for Engineering(工程化项目)

# 开发完成之后，需要验证dist是否正常，我们修改下nginx目录下的配置，使得nginx的静态资源映射到dist目录下，且修改下入口html

### 注意不要直接双击nginx.exe，这样会导致修改配置后重启、停止nginx无效，需要手动关闭任务管理器内的所有nginx进程

#
	location / {
	    root   D:\xxx\demo\dist;
	    index  detail.html index.html index.htm;
	}

# start nginx : 启动nginx
	./nginx -s reload  ：修改配置后重新加载生效
	./nginx -s reopen  ：重新打开日志文件
	./nginx -t -c /path/to/nginx.conf 测试nginx配置文件是否正确

# 关闭nginx：
	./nginx -s stop  :快速停止nginx
	./nginx -s quit  ：完整有序的停止nginx