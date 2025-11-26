CREATE DATABASE aerasense;
USE aerasense;

CREATE TABLE empresa (
id INT PRIMARY KEY AUTO_INCREMENT,
nome_fantasia VARCHAR(45) NOT NULL,
razao_social VARCHAR(100) NOT NULL, 
cnpj CHAR(14) UNIQUE NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
ddi_telefone VARCHAR(6) NOT NULL,	
ddd_telefone VARCHAR(3) NOT NULL,
telefone VARCHAR(15) NOT NULL,
status_empresa VARCHAR(15) NOT NULL DEFAULT 'ativo',
data_hora_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
data_hora_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT chkStatusEmpresa CHECK (status_empresa IN ('ativo','inativo')),
codigo_ativacao char(6) not null unique
);

CREATE TABLE endereco (
id INT PRIMARY KEY AUTO_INCREMENT,
logradouro VARCHAR(45) NOT NULL,
numero VARCHAR(8) NOT NULL,
bairro VARCHAR(20) NOT NULL, 
cidade VARCHAR(25) NOT NULL,
uf CHAR(2) NOT NULL,
cep CHAR(8) NOT NULL, 
complemento VARCHAR(15),
matriz TINYINT NOT NULL, 
data_hora_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
data_hora_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
fk_id_empresa INT,
CONSTRAINT fkEmpresaEndereco
		FOREIGN KEY (fk_id_empresa)
			REFERENCES empresa (id),
	CONSTRAINT chkUf CHECK (uf IN (
		'AC', 'AL', 'AP',
		'AM', 'BA', 'CE',
		'DF', 'ES', 'GO',
		'MA', 'MT', 'MS',
		'MG', 'PA', 'PB',
		'PR', 'PE', 'PI',
		'RJ', 'RN', 'RS',
		'RO', 'RR', 'SC',
		'SP', 'SE', 'TO')
		)
);

CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
sobrenome VARCHAR(60) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
senha VARCHAR(50) NOT NULL,
tipo_usuario VARCHAR(15) NOT NULL DEFAULT 'comum',
status_usuario VARCHAR(9) NOT NULL DEFAULT 'ativo',
data_hora_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
data_hora_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
fk_id_empresa INT,
fk_id_adm INT, 
CONSTRAINT chkTipoUsuario CHECK (tipo_usuario IN ('comum','admin')),
CONSTRAINT chkStatusUsuario CHECK (status_usuario IN ('ativo','inativo')),
CONSTRAINT fkEmpresaUsuario
FOREIGN KEY (fk_id_empresa) REFERENCES empresa (id),
CONSTRAINT fkAdmUsuario
FOREIGN KEY (fk_id_adm) REFERENCES usuario (id)
);

create table acesso(
idAcesso int auto_increment,
fkUsuario int,
fkEmpresa int,
dtHrLogin datetime default current_timestamp,
dtHrLogout datetime default null,
constraint pkComposta
	primary key(idAcesso,fkUsuario,fkEmpresa),
constraint fkUsuario
	foreign key (fkUsuario)
    references usuario(id),
constraint fkEmpresa 
	foreign key (fkEmpresa)
    references empresa(id)
);

CREATE TABLE setor (
id INT AUTO_INCREMENT,
nome VARCHAR(30) NOT NULL,
categoria VARCHAR(45) NOT NULL,
descricao VARCHAR(45),
codigo_setor CHAR(6) NOT NULL,
fk_id_empresa INT, 
CONSTRAINT pkCompostaEmpresaSetor
PRIMARY KEY (id, fk_id_empresa),
CONSTRAINT fkEmpresaSetor
FOREIGN KEY (fk_id_empresa) REFERENCES empresa (id)
);

CREATE TABLE sensor (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
codigo CHAR(15) NOT NULL,
localizacao VARCHAR(45) NOT NULL,
frequencia_leitura INT NOT NULL,
rotulo VARCHAR(45),
status_sensor VARCHAR(15) NOT NULL DEFAULT 'ativo',
codigo_botijao CHAR(7),
data_hora_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
data_hora_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
fk_id_setor INT,
fk_EmpresaSetor INT,
CONSTRAINT chkStatusSensor CHECK (status_sensor IN ('ativo','inativo')),
CONSTRAINT fkSetorSensor
FOREIGN KEY (fk_id_setor) REFERENCES setor(id),
CONSTRAINT fkEmpresaSetorSensor
FOREIGN KEY (fk_EmpresaSetor) REFERENCES setor (fk_id_empresa)
);

CREATE TABLE medicao (
id INT AUTO_INCREMENT,
valor_medicao DECIMAL (4,2), -- Percentual
data_hora_medicao DATETIME DEFAULT CURRENT_TIMESTAMP,
fk_id_sensor INT,
CONSTRAINT pkCompostaSensorMedicao
PRIMARY KEY (id, fk_id_sensor),
CONSTRAINT fkSensorMedicao
FOREIGN KEY (fk_id_sensor) REFERENCES sensor (id)
);

create table alerta(
idAlerta int auto_increment,
idMedicao int,
idSensor int,
dtHr datetime default current_timestamp,
nivel varchar(45),
constraint chkNivel 
	check (nivel in ('Crítico','Risco')),
constraint pkComposta 
	primary key (idAlerta,idMedicao,idSensor),
constraint fkMedicao
	foreign key (idMedicao)
    references medicao(id),
constraint fkSensor 
	foreign key (idSensor)
    references sensor(id)
);

INSERT INTO empresa VALUES
(DEFAULT, 'Sabor Express', 'SABOR EXPRESS COZINHAS INDUSTRIAIS LTDA', '12345678000180', 'contato@saborexpress.com.br', '+55', '11', '9987654321', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT, 'Casa Francesa', 'CASA FRANCESA & CIA LTDA', '87654321000170', 'contato@casafrancesa.com.br', '+55', '14', '6851651335', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT, 'Alimenta+', 'REFEICOES SAUDAVEIS ALIMENTA MAIS S.A.', '12348765000140', 'comercial@alimentamais.com', '+55', '21', '9945678824', DEFAULT, DEFAULT, DEFAULT);

INSERT INTO endereco VALUES
(DEFAULT, 'Rua das Cozinhas', '1500', 'Vila Nova', 'São Paulo', 'SP', '04442000', 'S/C', 0, DEFAULT, DEFAULT, 1),
(DEFAULT, 'Rua França', '2879', 'Campo Azul', 'Bauru', 'SP', '02222900', 'S/C', 1, DEFAULT, DEFAULT, 2),
(DEFAULT, 'Avenida Principal', '45', 'Centro', 'Rio de Janeiro', 'RJ', '06666001', 'S/C', 1, DEFAULT, DEFAULT, 3);



INSERT INTO usuario VALUES
(DEFAULT, 'Godofredo Luis', 'Silva Santos', 'godofredo@saborexpress.com.br', '0665A0C21689CCB28F234B0533629EB6C65D7919352D676DD9DDBCAECAB6E112', 'admin', 'inativo', DEFAULT, DEFAULT, 1, 1),
(DEFAULT, 'Fernando', 'Duarte Brandão', 'fernando.brandao@casafrancesa.com.br', '2FE456572BFB37880A863D593936C52A16840B0AF85FC5118140101C05843E28', 'admin', 'ativo', DEFAULT, DEFAULT, 2, 2),
(DEFAULT, 'Regiane', 'Lima Pinheiro', 'regiane_lima@alimentamais.com', '2FE456572BFB37880A863D593936C52A16840B0AF85FC5118140101C05843E28', 'admin', 'ativo', DEFAULT, DEFAULT, 3, 3);

INSERT INTO setor VALUES 
(DEFAULT, 'Panettones e Chocottones', 'Cocção', 'setor de cocção de panettones e chocottones','#A0001', 2),
(DEFAULT, 'Pães e Bolos', 'Cocção', 'setor de cocção de pães e bolos caseiros', '#A0002', 2),
(DEFAULT, 'Wafers e biscoitos', 'Cocção', 'setor de cocção de wafers e biscoitos doces', '#A0003', 2),
(DEFAULT, 'Cream Crackers', 'Cocção', 'setor de cocção de cream crackers', '#A0004', 2),
(DEFAULT, 'Torradas', 'Cocção', 'setor de cocção de torradas', '#A0005', 2);

INSERT INTO sensor VALUES 
(DEFAULT, 'Sensor GLP Panettones', 'GLP0010001', 'Área 4321', 10, NULL, DEFAULT, '#BTJ001', DEFAULT, DEFAULT, 1, 2),  
(DEFAULT, 'Sensor GLP Panettones', 'GLP0010002', 'Área 4321', 10, NULL, DEFAULT, '#BTJ002', DEFAULT, DEFAULT, 1, 2),  
(DEFAULT, 'Sensor GLP Panettones', 'GLP0010003', 'Área 4321', 10, NULL, DEFAULT, '#BTJ003', DEFAULT, DEFAULT, 1, 2),  
(DEFAULT, 'Sensor GLP Padaria', 'GLP0010004', 'Área 4322', 10, NULL, DEFAULT, '#BTJ001', DEFAULT, DEFAULT, 2, 2),  
(DEFAULT, 'Sensor GLP Padaria', 'GLP0010005', 'Área 4322', 10, NULL, DEFAULT, '#BTJ002', DEFAULT, DEFAULT, 2, 2),  
(DEFAULT, 'Sensor GLP Wafer', 'GLP0010006', 'Área 4323', 10, NULL, DEFAULT, '#BTJ001', DEFAULT, DEFAULT, 3, 2),  
(DEFAULT, 'Sensor GLP Crackers', 'GLP0010007', 'Área 4323', 10, NULL, DEFAULT, '#BTJ002', DEFAULT, DEFAULT, 4, 2),  
(DEFAULT, 'Sensor GLP Torradas', 'GLP0010008', 'Área 4322', 10, NULL, DEFAULT, '#BTJ003', DEFAULT, DEFAULT, 5, 2);

describe sensor;

SELECT 
usuario.nome AS 'Nome do Usuário', usuario.sobrenome AS 'Sobrenome do usuário', usuario.tipo_usuario AS 'Tipo do Usuário', 
empresa.nome_fantasia AS 'Nome da Empresa', empresa.cnpj AS 'CNPJ da empresa', empresa.email AS 'E-mail da empresa',
endereco.logradouro AS 'Logradouro', endereco.cidade AS 'Cidade', endereco.cep AS 'CEP',
setor.nome AS 'Nome do setor', setor.codigo_setor AS 'Código do Setor', sensor.codigo AS 'Código do Sensor', 
medicao.valor_medicao AS 'Valor da concentração', medicao.data_hora_medicao AS 'Data e Hora da Medição'
FROM empresa JOIN usuario 
ON empresa.id = usuario.fk_id_empresa
JOIN endereco 
ON empresa.id = endereco.fk_id_empresa
JOIN setor 
ON empresa.id = setor.fk_id_empresa
JOIN sensor 
ON setor.id = sensor.fk_id_setor -- Junta setor e sensor pelo ID do setor
AND empresa.id = sensor.fk_EmpresaSetor -- Junta empresa e sensor pelo ID da empresa
JOIN medicao 
ON sensor.id = medicao.fk_id_sensor;

use aerasense;

select * from usuario;

drop database aerasense;
