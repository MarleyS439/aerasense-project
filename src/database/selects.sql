-- SELECTS

-- Maior proporção de críticos
SELECT str.id AS setor,
       SUM(CASE
               WHEN a.nivel = 'Crítico' THEN 1
               ELSE 0
           END) AS 'Alertas_Críticos',
       SUM(CASE
               WHEN a.nivel = 'Risco' THEN 1
               ELSE 0
           END) AS 'Alertas_Risco'
FROM alerta AS a
JOIN sensor AS sen ON a.idsensor = sen.id
JOIN setor AS str ON sen.fk_id_setor = str.id
WHERE str.fk_id_empresa = 1
GROUP BY str.id;

-- Maior leitura registrada
SELECT str.id AS setor,
       MAX(m.valor_medicao) AS 'Maior_Medição'
FROM setor AS str
JOIN sensor AS sen ON sen.fk_id_setor = str.id
JOIN medicao AS m ON m.fk_id_sensor = sen.id
WHERE str.fk_id_empresa = 1
GROUP BY str.id;

-- Maior incidência de alertas
SELECT str.id AS setor,
       COUNT(a.idalerta) AS 'Alertas'
FROM alerta AS a
JOIN sensor AS sen ON a.idsensor = sen.id
JOIN setor AS str ON sen.fk_id_setor = str.id
WHERE str.fk_id_empresa = 1
GROUP BY str.id;

-- Sensores ativos
SELECT emp.nome_fantasia AS 'Empresa',
       COUNT(sen.id) AS 'Sensores_Ativos'
FROM empresa AS emp
JOIN setor AS str ON str.fk_id_empresa = emp.id
JOIN sensor AS sen ON sen.fk_id_setor = str.id
WHERE sen.status_sensor = 'ativo'
    AND str.fk_id_empresa = 1
GROUP BY emp.nome_fantasia;

-- Sensores com atenção
SELECT emp.nome_fantasia AS 'Empresa',
       COUNT(sen.id) AS 'Sensores_Ativos',
       SUM(CASE
               WHEN sen.status_sensor != 'ativo' THEN 1
               ELSE 0
           END) AS 'Sensores_inativos'
FROM empresa AS emp
JOIN setor AS str ON str.fk_id_empresa = emp.id
JOIN sensor AS sen ON sen.fk_id_setor = str.id
WHERE str.fk_id_empresa = 1
GROUP BY emp.nome_fantasia;

-- Alertas críticos
SELECT emp.id AS empresa,
       SUM(CASE
               WHEN a.nivel = 'Crítico' THEN 1
               ELSE 0
           END) AS 'Alertas_Críticos'
FROM alerta AS a
JOIN sensor AS sen ON a.idsensor = sen.id
JOIN setor AS str ON sen.fk_id_setor = str.id
JOIN empresa AS emp ON str.fk_id_empresa = emp.id
WHERE str.fk_id_empresa = 1
GROUP BY emp.id;

-- Setores cadastrados
SELECT emp.id AS empresa,
       COUNT(str.id) AS 'Setores'
FROM empresa AS emp
JOIN setor AS str ON emp.id = str.fk_id_empresa
WHERE emp.id = 1
GROUP BY emp.id;
