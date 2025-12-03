-- INSERTS

-- Empresas
INSERT INTO empresa (nome_fantasia, razao_social, cnpj, email, ddi_telefone, ddd_telefone, telefone, codigo_ativacao)
VALUES ('Sabor Express', 'SABOR EXPRESS COZINHAS INDUSTRIAIS LTDA', '12345678000180', 'contato@saborexpress.com.br', '+55', '11', '9987654321', 'ACT001'),
       ('Casa Francesa', 'CASA FRANCESA & CIA LTDA', '87654321000170', 'contato@casafrancesa.com.br', '+55', '14', '6851651335', 'ACT002'),
       ('Alimenta+', 'REFEICOES SAUDAVEIS ALIMENTA MAIS S.A.', '12348765000140', 'comercial@alimentamais.com', '+55', '21', '9945678824', 'ACT003');

-- Endereços
INSERT INTO endereco (logradouro, numero, bairro, cidade, uf, cep, complemento, matriz, fk_id_empresa)
VALUES ('Rua das Cozinhas', '1500', 'Vila Nova', 'São Paulo', 'SP', '04442000', 'S/C', 0, 1),
       ('Rua França', '2879', 'Campo Azul', 'Bauru', 'SP', '02222900', 'S/C', 1, 2),
       ('Avenida Principal', '45', 'Centro', 'Rio de Janeiro', 'RJ', '06666001', 'S/C', 1, 3);

-- Usuários
INSERT INTO usuario (nome, sobrenome, email, senha, tipo_usuario, status_usuario, fk_id_empresa, fk_id_adm)
VALUES ('Godofredo Luis', 'Silva Santos', 'godofredo@saborexpress.com.br', 'Senha#123', 'admin', 'inativo', 1, NULL),
       ('Fernando', 'Duarte Brandão', 'fernando.brandao@casafrancesa.com.br', 'Fernando#123', 'admin', 'ativo', 2, NULL),
       ('Regiane', 'Lima Pinheiro', 'regiane_lima@alimentamais.com', 'Regiane#123', 'admin', 'ativo', 3, NULL);

-- Setores
INSERT INTO setor (nome, categoria, descricao, codigo_setor, fk_id_empresa)
VALUES ('Panettones e Chocottones', 'Cocção', 'setor de cocção de panettones', '#A0001', 2),
       ('Pães e Bolos', 'Cocção', 'setor de cocção de pães', '#A0002', 2),
       ('Wafers e biscoitos', 'Cocção', 'setor de cocção de wafers', '#A0003', 2),
       ('Cream Crackers', 'Cocção', 'setor de cocção de cream crackers', '#A0004', 2),
       ('Torradas', 'Cocção', 'setor de cocção de torradas', '#A0005', 2);

-- Sensor
INSERT INTO sensor (nome, codigo, localizacao, frequencia_leitura, rotulo, codigo_botijao, fk_id_setor, fk_empresasetor)
VALUES ('Sensor GLP Panettones', 'GLP0010001', 'Área 4321', 10, NULL, '#BTJ001', 1, 2),
       ('Sensor GLP Panettones', 'GLP0010002', 'Área 4321', 10, NULL, '#BTJ002', 1, 2),
       ('Sensor GLP Panettones', 'GLP0010003', 'Área 4321', 10, NULL, '#BTJ003', 1, 2),
       ('Sensor GLP Padaria', 'GLP0010004', 'Área 4322', 10, NULL, '#BTJ001', 2, 2),
       ('Sensor GLP Padaria', 'GLP0010005', 'Área 4322', 10, NULL, '#BTJ002', 2, 2),
       ('Sensor GLP Wafer', 'GLP0010006', 'Área 4323', 10, NULL, '#BTJ001', 3, 2),
       ('Sensor GLP Crackers', 'GLP0010007', 'Área 4323', 10, NULL, '#BTJ002', 4, 2),
       ('Sensor GLP Torradas', 'GLP0010008', 'Área 4322', 10, NULL, '#BTJ003', 5, 2);

-- Medições
INSERT INTO medicao (valor_medicao, fk_id_sensor)
VALUES (12.5, 1),
       (13.0, 1),
       (05.0, 2),
       (01.2, 3),
       (25.0, 4),
       (10.0, 5),
       (02.5, 6),
       (03.0, 7),
       (04.1, 8);
