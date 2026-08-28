/**
 * ============================================================================
 * Operação NEXO — Dataset de Temporadas & Surtidas Táticas (6 Meses / 24 Semanas)
 * ============================================================================
 * Estrutura de Temporadas:
 * - 6 Regiões / Países Fictícios (1 por Mês)
 * - 4 Semanas por Região (Dificuldade 1 a 4)
 * - 3 a 4 Setores Encadeados por Semana
 * - 2 a 4 Protocolos por Setor (Apenas 1 Taticamente Correto)
 * - Avaliação Booleana Real com Toggles [ + / NOT ] e Conectivos [ AND / OR / XOR ]
 */

export const LEVELS_DATA = {
  "temporadas": [
    {
      "id": "regiao_01_neo_aethel",
      "mes": 1,
      "region_name": "Metrópole de Neo-Aethel (Solária)",
      "disaster_name": "Mega-Terremoto de Falha Geológica",
      "weeks": [
        {
          "week_number": 1,
          "week_title": "Semana 01: Triagem & Resgate Inicial no Centro",
          "difficulty_tier": 1,
          "map_image": "./assets/sprites/maps/map_r1_s1.png",
          "stages": [
            {
              "stage_id": "r1_s1_p1_aurora",
              "stage_number": 1,
              "sector_name": "Ponto Alfa: Edifício Aurora (Heliponto)",
              "coordinates": { "x": 180, "y": 140 },
              "situation_report": "Sobreviventes sinalizando no heliponto do 4º andar. Fumaça de escombros, sem gás tóxico no ar.",
              "sensors": {
                "CIVIS_DETECTADOS": true,
                "FOGO_ATIVO": false,
                "GAS_TOXICO": false,
                "BATERIA_DRONE": true
              },
              "protocols": [
                {
                  "id": "proto_alpha_evac",
                  "type": "ALPHA",
                  "title": "Protocolo Alpha — Evacuação Aérea de Sobreviventes",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["CIVIS_DETECTADOS", "GAS_TOXICO", "BATERIA_DRONE"],
                  "hint": "Para evacuar com segurança: precisamos de civis E bateria, com ausência de gás (NOT)."
                },
                {
                  "id": "proto_bravo_retardante",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Lançamento de Retardante Químico",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["FOGO_ATIVO", "CIVIS_DETECTADOS", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: O Protocolo Bravo dispararia espuma química sobre civis no heliponto sem fogo ativo! A situação exige Protocolo Alpha (Resgate)."
                }
              ],
              "time_limit": 55,
              "base_score": 1000
            },
            {
              "stage_id": "r1_s1_p2_hospital",
              "stage_number": 2,
              "sector_name": "Ponto Bravo: Hospital Central",
              "coordinates": { "x": 460, "y": 280 },
              "situation_report": "Queda total de energia na ala de UTIs. Gerador local avariado. Sem chamas no teto.",
              "sensors": {
                "CIVIS_DETECTADOS": true,
                "ENERGIA_ESTAVEL": false,
                "FOGO_ATIVO": false,
                "BATERIA_DRONE": true
              },
              "protocols": [
                {
                  "id": "proto_charlie_energia",
                  "type": "CHARLIE",
                  "title": "Protocolo Charlie — Acoplamento de Bateria Móvel",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["ENERGIA_ESTAVEL", "BATERIA_DRONE", "FOGO_ATIVO"],
                  "hint": "Acople energia se a rede NÃO estiver estável (NOT) E o drone tiver bateria, sem fogo no local."
                },
                {
                  "id": "proto_bravo_espuma",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Contenção de Incêndio",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["FOGO_ATIVO", "CIVIS_DETECTADOS", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Não há chamas no hospital. A prioridade máxima é restabelecer energia na UTI com o Protocolo Charlie!"
                }
              ],
              "time_limit": 50,
              "base_score": 1200
            },
            {
              "stage_id": "r1_s1_p3_refinaria",
              "stage_number": 3,
              "sector_name": "Ponto Charlie: Válvula Sul de Gás",
              "coordinates": { "x": 240, "y": 380 },
              "situation_report": "Vazamento severo de gás metano após tremor. Nenhum civil na área isolada.",
              "sensors": {
                "GAS_TOXICO": true,
                "FOGO_ATIVO": false,
                "CIVIS_DETECTADOS": false,
                "BATERIA_DRONE": true
              },
              "protocols": [
                {
                  "id": "proto_bravo_vedacao",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Vedação por Espuma Química",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["GAS_TOXICO", "CIVIS_DETECTADOS", "BATERIA_DRONE"],
                  "hint": "Dispare a vedação se houver gás tóxico E bateria, garantindo ausência de civis (NOT)."
                },
                {
                  "id": "proto_alpha_resgate",
                  "type": "ALPHA",
                  "title": "Protocolo Alpha — Resgate Aéreo",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["CIVIS_DETECTADOS", "GAS_TOXICO", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Não há civis na válvula. Pousar para resgate em atmosfera com gás tóxico destruiria o drone! Use Protocolo Bravo."
                }
              ],
              "time_limit": 45,
              "base_score": 1400
            }
          ]
        },
        {
          "week_number": 2,
          "week_title": "Semana 02: Efeito Cascata & Sobrecarga Térmica",
          "difficulty_tier": 2,
          "map_image": "./assets/sprites/maps/map_r1_s2.png",
          "stages": [
            {
              "stage_id": "r1_s2_p1_termoeletrica",
              "stage_number": 1,
              "sector_name": "Ponto Alfa: Usina Termoelétrica",
              "coordinates": { "x": 300, "y": 220 },
              "situation_report": "Superaquecimento em turbina a gás. Alarme térmico acionado. Sem pessoas no galpão.",
              "sensors": {
                "FOGO_ATIVO": true,
                "GAS_TOXICO": true,
                "CIVIS_DETECTADOS": false,
                "BATERIA_DRONE": true
              },
              "protocols": [
                {
                  "id": "proto_bravo_resfriamento",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Inundação de Gás Inerte",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["FOGO_ATIVO", "GAS_TOXICO", "CIVIS_DETECTADOS"],
                  "hint": "Inunde se houver fogo OU gás, desde que NÃO haja civis (NOT)."
                },
                {
                  "id": "proto_alpha_evac",
                  "type": "ALPHA",
                  "title": "Protocolo Alpha — Evacuação de Emergência",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["CIVIS_DETECTADOS", "GAS_TOXICO", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Sem civis para evacuar. A turbina explodirá se a contenção térmica (Bravo) não for executada!"
                },
                {
                  "id": "proto_charlie_bypass",
                  "type": "CHARLIE",
                  "title": "Protocolo Charlie — Bypass Elétrico",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["ENERGIA_ESTAVEL", "FOGO_ATIVO", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Bypass elétrico sob fogo e vazamento causará curto-circuito catastrófico! Use Protocolo Bravo."
                }
              ],
              "time_limit": 45,
              "base_score": 1500
            },
            {
              "stage_id": "r1_s2_p2_complexo_norte",
              "stage_number": 2,
              "sector_name": "Ponto Bravo: Complexo Escolar Norte",
              "coordinates": { "x": 520, "y": 140 },
              "situation_report": "Desabamento parcial na ala esportiva. Civis abrigados sob vigas estáveis.",
              "sensors": {
                "CIVIS_DETECTADOS": true,
                "ESTRUTURA_ABALADA": false,
                "GAS_TOXICO": false,
                "BATERIA_DRONE": true
              },
              "protocols": [
                {
                  "id": "proto_alpha_cabo",
                  "type": "ALPHA",
                  "title": "Protocolo Alpha — Fixação de Cabo Guia & Içamento",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["CIVIS_DETECTADOS", "ESTRUTURA_ABALADA", "GAS_TOXICO"],
                  "hint": "Içamento seguro exige civis E ausência de estrutura abalada (NOT), sem gás tóxico (NOT)."
                },
                {
                  "id": "proto_bravo_espuma",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Lançamento de Retardante",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["FOGO_ATIVO", "CIVIS_DETECTADOS", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Não há fogo ativo na ala esportiva. Civis aguardam extração aérea (Alpha)!"
                },
                {
                  "id": "proto_delta_pulso",
                  "type": "DELTA",
                  "title": "Protocolo Delta — Pulso de Destravamento Magnético",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["CIRCUITO_A", "CIRCUITO_B", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: O ginásio não possui portas blindadas magnéticas. Execute o Protocolo Alpha de resgate."
                }
              ],
              "time_limit": 40,
              "base_score": 1700
            },
            {
              "stage_id": "r1_s2_p3_terminal",
              "stage_number": 3,
              "sector_name": "Ponto Charlie: Terminal Logístico Central",
              "coordinates": { "x": 160, "y": 420 },
              "situation_report": "Vagão cisterna tombado na linha férrea. Fogo ativo com fumaça tóxica.",
              "sensors": {
                "FOGO_ATIVO": true,
                "GAS_TOXICO": true,
                "CIVIS_DETECTADOS": false,
                "BATERIA_DRONE": true
              },
              "protocols": [
                {
                  "id": "proto_bravo_canhao",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Canhão de Nitrogênio Líquido",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["FOGO_ATIVO", "GAS_TOXICO", "CIVIS_DETECTADOS"],
                  "hint": "Dispare se houver fogo E gás, garantindo ausência de civis (NOT)."
                },
                {
                  "id": "proto_charlie_suporte",
                  "type": "CHARLIE",
                  "title": "Protocolo Charlie — Restauração de Subestação",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["ENERGIA_ESTAVEL", "BATERIA_DRONE", "FOGO_ATIVO"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: A prioridade imediata é conter a cisterna em chamas (Bravo) antes de energizar a linha férrea."
                }
              ],
              "time_limit": 38,
              "base_score": 1900
            }
          ]
        },
        {
          "week_number": 3,
          "week_title": "Semana 03: Risco Estrutural & Portas Blindadas",
          "difficulty_tier": 3,
          "map_image": "./assets/sprites/maps/map_r1_s3.png",
          "stages": [
            {
              "stage_id": "r1_s3_p1_refugio",
              "stage_number": 1,
              "sector_name": "Ponto Alfa: Refúgio Subterrâneo Delta",
              "coordinates": { "x": 140, "y": 360 },
              "situation_report": "Porta blindada emperrada com civis abrigados. Circuitos magnéticos instáveis.",
              "sensors": {
                "CIRCUITO_A": true,
                "CIRCUITO_B": false,
                "BATERIA_DRONE": true,
                "GAS_TOXICO": false
              },
              "protocols": [
                {
                  "id": "proto_delta_pulso_exclusivo",
                  "type": "DELTA",
                  "title": "Protocolo Delta — Destravamento por Pulso Magnético Exclusivo",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["CIRCUITO_A", "CIRCUITO_B", "BATERIA_DRONE"],
                  "hint": "O destravamento magnético exige pulso exclusivo em apenas UM circuito (XOR) com bateria disponível."
                },
                {
                  "id": "proto_bravo_explosivo",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Detonação de Carga de Abertura",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["FOGO_ATIVO", "CIVIS_DETECTADOS", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Usar explosivos na porta soterraria o abrigo com civis! Use o Protocolo Delta de pulso magnético."
                },
                {
                  "id": "proto_alpha_evac",
                  "type": "ALPHA",
                  "title": "Protocolo Alpha — Evacuação Direta",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["CIVIS_DETECTADOS", "GAS_TOXICO", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: O drone não consegue alcançar os civis enquanto a blindagem estiver trancada. Destrave primeiro com Protocolo Delta!"
                }
              ],
              "time_limit": 35,
              "base_score": 2000
            },
            {
              "stage_id": "r1_s3_p2_ponte_norte",
              "stage_number": 2,
              "sector_name": "Ponto Bravo: Ponte Suspensa Norte",
              "coordinates": { "x": 420, "y": 180 },
              "situation_report": "Cabos de sustentação partidos. Veículos com passageiros presos na pista suspensa.",
              "sensors": {
                "CIVIS_DETECTADOS": true,
                "ESTRUTURA_ABALADA": true,
                "FOGO_ATIVO": false,
                "BATERIA_DRONE": true
              },
              "protocols": [
                {
                  "id": "proto_alpha_ancoragem",
                  "type": "ALPHA",
                  "title": "Protocolo Alpha — Içamento Aéreo Prioritário",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["CIVIS_DETECTADOS", "FOGO_ATIVO", "BATERIA_DRONE"],
                  "hint": "Içamento imediato: civis presentes E bateria disponível, sem fogo no local (NOT)."
                },
                {
                  "id": "proto_charlie_solda",
                  "type": "CHARLIE",
                  "title": "Protocolo Charlie — Solda Estrutural Móvel",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["ENERGIA_ESTAVEL", "ESTRUTURA_ABALADA", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: A ponte vai cair em segundos. Evacue as pessoas (Alpha) antes de qualquer reparo técnico!"
                }
              ],
              "time_limit": 35,
              "base_score": 2100
            },
            {
              "stage_id": "r1_s3_p3_subestacao",
              "stage_number": 3,
              "sector_name": "Ponto Charlie: Subestação Hidráulica",
              "coordinates": { "x": 560, "y": 360 },
              "situation_report": "Válvulas de controle de pressão travadas. Risco de inundação de escombros.",
              "sensors": {
                "VALVULA_ABERTA": false,
                "TEMPERATURA_CRITICA": true,
                "BATERIA_DRONE": true
              },
              "protocols": [
                {
                  "id": "proto_charlie_pressurizacao",
                  "type": "CHARLIE",
                  "title": "Protocolo Charlie — Bypass Hidráulico de Alívio",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["VALVULA_ABERTA", "TEMPERATURA_CRITICA", "BATERIA_DRONE"],
                  "hint": "Alivie a pressão se a válvula NÃO estiver aberta (NOT) E a temperatura estiver crítica com bateria."
                },
                {
                  "id": "proto_delta_pulso",
                  "type": "DELTA",
                  "title": "Protocolo Delta — Pulso Eletromagnético",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["CIRCUITO_A", "CIRCUITO_B", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: O sistema hidráulico é mecânico e requer pressurização Charlie, não pulso magnético."
                }
              ],
              "time_limit": 32,
              "base_score": 2200
            },
            {
              "stage_id": "r1_s3_p4_silo_final",
              "stage_number": 4,
              "sector_name": "Ponto Delta: Silo Central de Contenção",
              "coordinates": { "x": 280, "y": 260 },
              "situation_report": "Último ponto de drenagem. Sistema de segurança requer autorização de pulso exclusivo.",
              "sensors": {
                "CIRCUITO_A": false,
                "CIRCUITO_B": true,
                "BATERIA_DRONE": true
              },
              "protocols": [
                {
                  "id": "proto_delta_drenagem",
                  "type": "DELTA",
                  "title": "Protocolo Delta — Destravamento da Eclusa de Drenagem",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["CIRCUITO_A", "CIRCUITO_B", "BATERIA_DRONE"],
                  "hint": "Autorize a eclusa aplicando pulso exclusivo em apenas UM dos circuitos (XOR) com bateria."
                },
                {
                  "id": "proto_bravo_espuma",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Inundação de Espuma",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["FOGO_ATIVO", "GAS_TOXICO", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: O silo está intacto, precisa apenas ser destravado com pulso magnético Delta."
                }
              ],
              "time_limit": 30,
              "base_score": 2500
            }
          ]
        },
        {
          "week_number": 4,
          "week_title": "Semana 04: Colapso Crítico Geral (Clímax da Temporada)",
          "difficulty_tier": 4,
          "map_image": "./assets/sprites/maps/map_r1_s4.png",
          "stages": [
            {
              "stage_id": "r1_s4_p1_torre_tv",
              "stage_number": 1,
              "sector_name": "Ponto Alfa: Torre de Transmissão Central",
              "coordinates": { "x": 340, "y": 100 },
              "situation_report": "Queda dos transmissores de emergência. Civis no saguão inferior.",
              "sensors": {
                "CIVIS_DETECTADOS": true,
                "ENERGIA_ESTAVEL": false,
                "GAS_TOXICO": false,
                "BATERIA_DRONE": true
              },
              "protocols": [
                {
                  "id": "proto_alpha_resgate",
                  "type": "ALPHA",
                  "title": "Protocolo Alpha — Resgate Aéreo de Comunicações",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["CIVIS_DETECTADOS", "GAS_TOXICO", "BATERIA_DRONE"],
                  "hint": "Resgate com civis E bateria, garantindo ausência de gás (NOT)."
                },
                {
                  "id": "proto_charlie_gerador",
                  "type": "CHARLIE",
                  "title": "Protocolo Charlie — Reativação da Antena",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["ENERGIA_ESTAVEL", "BATERIA_DRONE", "FOGO_ATIVO"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Vidas humanas primeiro! Evacue os operadores (Alpha) antes de tentar salvar a antena."
                },
                {
                  "id": "proto_delta_pulso",
                  "type": "DELTA",
                  "title": "Protocolo Delta — Pulso Eletromagnético",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["CIRCUITO_A", "CIRCUITO_B", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: O pulso queimaria os aparelhos de rádio sobreviventes. Execute Protocolo Alpha."
                },
                {
                  "id": "proto_bravo_quimico",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Retardante",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["FOGO_ATIVO", "CIVIS_DETECTADOS", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Sem fogo no saguão. Use Protocolo Alpha."
                }
              ],
              "time_limit": 30,
              "base_score": 2200
            },
            {
              "stage_id": "r1_s4_p2_bunker_governo",
              "stage_number": 2,
              "sector_name": "Ponto Bravo: Bunker de Comando do Governo",
              "coordinates": { "x": 160, "y": 240 },
              "situation_report": "Sobrecarga nos trincos magnéticos da sala de crise.",
              "sensors": {
                "CIRCUITO_A": true,
                "CIRCUITO_B": false,
                "BATERIA_DRONE": true
              },
              "protocols": [
                {
                  "id": "proto_delta_destrave_bunker",
                  "type": "DELTA",
                  "title": "Protocolo Delta — Pulso Exclusivo de Liberação",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["CIRCUITO_A", "CIRCUITO_B", "BATERIA_DRONE"],
                  "hint": "Pulso exclusivo: CIRCUITO_A XOR CIRCUITO_B com bateria disponível."
                },
                {
                  "id": "proto_alpha_evac",
                  "type": "ALPHA",
                  "title": "Protocolo Alpha — Evacuação",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["CIVIS_DETECTADOS", "GAS_TOXICO", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Impossível evacuar antes de destravar as portas blindadas com Protocolo Delta!"
                },
                {
                  "id": "proto_bravo_espuma",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Contenção",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["FOGO_ATIVO", "GAS_TOXICO", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Não há fogo no bunker. Destrave as portas com Delta."
                }
              ],
              "time_limit": 28,
              "base_score": 2400
            },
            {
              "stage_id": "r1_s4_p3_usina_reator",
              "stage_number": 3,
              "sector_name": "Ponto Charlie: Reator Auxiliar Subterrâneo",
              "coordinates": { "x": 480, "y": 380 },
              "situation_report": "Temperatura do líquido refrigerante no limite crítico.",
              "sensors": {
                "TEMPERATURA_CRITICA": true,
                "SISTEMA_REFRIGERACAO": false,
                "VALVULA_ABERTA": false,
                "BATERIA_DRONE": true
              },
              "protocols": [
                {
                  "id": "proto_charlie_reator",
                  "type": "CHARLIE",
                  "title": "Protocolo Charlie — Refrigeração Forçada de Emergência",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["TEMPERATURA_CRITICA", "SISTEMA_REFRIGERACAO", "BATERIA_DRONE"],
                  "hint": "Refrigere se a temperatura estiver crítica E o sistema NÃO estiver refrigerando (NOT) com bateria."
                },
                {
                  "id": "proto_bravo_extintor",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Retardante",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["FOGO_ATIVO", "CIVIS_DETECTADOS", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: O reator precisa de circulação interna Charlie, retardante externo causará choque térmico explosivo!"
                }
              ],
              "time_limit": 26,
              "base_score": 2600
            },
            {
              "stage_id": "r1_s4_p4_heliponto_geral",
              "stage_number": 4,
              "sector_name": "Ponto Delta: Pátio de Extração Geral",
              "coordinates": { "x": 260, "y": 480 },
              "situation_report": "Última leva de sobreviventes da cidade. Fogo contido, pista liberada.",
              "sensors": {
                "CIVIS_DETECTADOS": true,
                "GAS_TOXICO": false,
                "FOGO_ATIVO": false,
                "BATERIA_DRONE": true
              },
              "protocols": [
                {
                  "id": "proto_alpha_extracao_final",
                  "type": "ALPHA",
                  "title": "Protocolo Alpha — Extração em Massa & Salto Seguro",
                  "is_correct_protocol": true,
                  "sensor_tokens": ["CIVIS_DETECTADOS", "GAS_TOXICO", "BATERIA_DRONE"],
                  "hint": "Finalize a temporada: civis presentes E bateria do drone, garantindo ausência de gás (NOT)."
                },
                {
                  "id": "proto_delta_pulso",
                  "type": "DELTA",
                  "title": "Protocolo Delta — Pulso Magnético",
                  "is_correct_protocol": false,
                  "sensor_tokens": ["CIRCUITO_A", "CIRCUITO_B", "BATERIA_DRONE"],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Não há circuitos para destravar. Conclua o resgate com Protocolo Alpha!"
                }
              ],
              "time_limit": 25,
              "base_score": 3000
            }
          ]
        }
      ]
    },
    {
      "id": "regiao_02_porto_valencio",
      "mes": 2,
      "region_name": "Arquipélago de Porto Valêncio (Marítima)",
      "disaster_name": "Tufão Categoria 5 & Inundação Costeira",
      "weeks": []
    },
    {
      "id": "regiao_03_kaeldor",
      "mes": 3,
      "region_name": "Cordilheira de Kaeldor (Montanha)",
      "disaster_name": "Nevasca Polar & Tempestade Eletromagnética",
      "weeks": []
    },
    {
      "id": "regiao_04_zenite",
      "mes": 4,
      "region_name": "Vale Tecnológico de Zênite (Província)",
      "disaster_name": "Colapso em Cadeia de Rede / Cyber-Blackout",
      "weeks": []
    },
    {
      "id": "regiao_05_rio_verde",
      "mes": 5,
      "region_name": "Bacia Fluvial de Rio Verde (Pantanal Fictício)",
      "disaster_name": "Rompimento de Barragem & Onda de Lama",
      "weeks": []
    },
    {
      "id": "regiao_06_ferro_bravo",
      "mes": 6,
      "region_name": "Enclave Industrial de Ferro-Bravo (Mineração)",
      "disaster_name": "Explosão de Gás Metano & Incêndio Profundo",
      "weeks": []
    }
  ]
};
