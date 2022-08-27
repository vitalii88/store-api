start-dev-backend:
	make -C server dev
start-backend:
	make -C server start
install-backend:
	make -C server install
init-server:
	make -C server init & make -C server install
addTemplateData:
	make -C server addTemplateData
