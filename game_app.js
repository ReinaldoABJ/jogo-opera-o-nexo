/**
 * ============================================================================
 * Operação NEXO: Comando & Resgate — Standalone Bundle
 * ============================================================================
 * UFMT GameHub — Co-criado por Reinaldo Júnior & L.O.G.O.S.
 * Zero-Build Bundle — file:/// e Web compatível
 * ============================================================================
 */

(() => {
  'use strict';

  // DATASETS

window.LEVELS_DATA = {
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
              "coordinates": {
                "x": 180,
                "y": 140
              },
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
                  "sensor_tokens": [
                    "CIVIS_DETECTADOS",
                    "GAS_TOXICO",
                    "BATERIA_DRONE"
                  ],
                  "hint": "Para evacuar com segurança: precisamos de civis E bateria, com ausência de gás (NOT)."
                },
                {
                  "id": "proto_bravo_retardante",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Lançamento de Retardante Químico",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "FOGO_ATIVO",
                    "CIVIS_DETECTADOS",
                    "BATERIA_DRONE"
                  ],
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
              "coordinates": {
                "x": 460,
                "y": 280
              },
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
                  "sensor_tokens": [
                    "ENERGIA_ESTAVEL",
                    "BATERIA_DRONE",
                    "FOGO_ATIVO"
                  ],
                  "hint": "Acople energia se a rede NÃO estiver estável (NOT) E o drone tiver bateria, sem fogo no local."
                },
                {
                  "id": "proto_bravo_espuma",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Contenção de Incêndio",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "FOGO_ATIVO",
                    "CIVIS_DETECTADOS",
                    "BATERIA_DRONE"
                  ],
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
              "coordinates": {
                "x": 240,
                "y": 380
              },
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
                  "sensor_tokens": [
                    "GAS_TOXICO",
                    "CIVIS_DETECTADOS",
                    "BATERIA_DRONE"
                  ],
                  "hint": "Dispare a vedação se houver gás tóxico E bateria, garantindo ausência de civis (NOT)."
                },
                {
                  "id": "proto_alpha_resgate",
                  "type": "ALPHA",
                  "title": "Protocolo Alpha — Resgate Aéreo",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "CIVIS_DETECTADOS",
                    "GAS_TOXICO",
                    "BATERIA_DRONE"
                  ],
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
              "coordinates": {
                "x": 300,
                "y": 220
              },
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
                  "sensor_tokens": [
                    "FOGO_ATIVO",
                    "GAS_TOXICO",
                    "CIVIS_DETECTADOS"
                  ],
                  "hint": "Inunde se houver fogo OU gás, desde que NÃO haja civis (NOT)."
                },
                {
                  "id": "proto_alpha_evac",
                  "type": "ALPHA",
                  "title": "Protocolo Alpha — Evacuação de Emergência",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "CIVIS_DETECTADOS",
                    "GAS_TOXICO",
                    "BATERIA_DRONE"
                  ],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Sem civis para evacuar. A turbina explodirá se a contenção térmica (Bravo) não for executada!"
                },
                {
                  "id": "proto_charlie_bypass",
                  "type": "CHARLIE",
                  "title": "Protocolo Charlie — Bypass Elétrico",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "ENERGIA_ESTAVEL",
                    "FOGO_ATIVO",
                    "BATERIA_DRONE"
                  ],
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
              "coordinates": {
                "x": 520,
                "y": 140
              },
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
                  "sensor_tokens": [
                    "CIVIS_DETECTADOS",
                    "ESTRUTURA_ABALADA",
                    "GAS_TOXICO"
                  ],
                  "hint": "Içamento seguro exige civis E ausência de estrutura abalada (NOT), sem gás tóxico (NOT)."
                },
                {
                  "id": "proto_bravo_espuma",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Lançamento de Retardante",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "FOGO_ATIVO",
                    "CIVIS_DETECTADOS",
                    "BATERIA_DRONE"
                  ],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Não há fogo ativo na ala esportiva. Civis aguardam extração aérea (Alpha)!"
                },
                {
                  "id": "proto_delta_pulso",
                  "type": "DELTA",
                  "title": "Protocolo Delta — Pulso de Destravamento Magnético",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "CIRCUITO_A",
                    "CIRCUITO_B",
                    "BATERIA_DRONE"
                  ],
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
              "coordinates": {
                "x": 160,
                "y": 420
              },
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
                  "sensor_tokens": [
                    "FOGO_ATIVO",
                    "GAS_TOXICO",
                    "CIVIS_DETECTADOS"
                  ],
                  "hint": "Dispare se houver fogo E gás, garantindo ausência de civis (NOT)."
                },
                {
                  "id": "proto_charlie_suporte",
                  "type": "CHARLIE",
                  "title": "Protocolo Charlie — Restauração de Subestação",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "ENERGIA_ESTAVEL",
                    "BATERIA_DRONE",
                    "FOGO_ATIVO"
                  ],
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
              "coordinates": {
                "x": 140,
                "y": 360
              },
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
                  "sensor_tokens": [
                    "CIRCUITO_A",
                    "CIRCUITO_B",
                    "BATERIA_DRONE"
                  ],
                  "hint": "O destravamento magnético exige pulso exclusivo em apenas UM circuito (XOR) com bateria disponível."
                },
                {
                  "id": "proto_bravo_explosivo",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Detonação de Carga de Abertura",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "FOGO_ATIVO",
                    "CIVIS_DETECTADOS",
                    "BATERIA_DRONE"
                  ],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Usar explosivos na porta soterraria o abrigo com civis! Use o Protocolo Delta de pulso magnético."
                },
                {
                  "id": "proto_alpha_evac",
                  "type": "ALPHA",
                  "title": "Protocolo Alpha — Evacuação Direta",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "CIVIS_DETECTADOS",
                    "GAS_TOXICO",
                    "BATERIA_DRONE"
                  ],
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
              "coordinates": {
                "x": 420,
                "y": 180
              },
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
                  "sensor_tokens": [
                    "CIVIS_DETECTADOS",
                    "FOGO_ATIVO",
                    "BATERIA_DRONE"
                  ],
                  "hint": "Içamento imediato: civis presentes E bateria disponível, sem fogo no local (NOT)."
                },
                {
                  "id": "proto_charlie_solda",
                  "type": "CHARLIE",
                  "title": "Protocolo Charlie — Solda Estrutural Móvel",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "ENERGIA_ESTAVEL",
                    "ESTRUTURA_ABALADA",
                    "BATERIA_DRONE"
                  ],
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
              "coordinates": {
                "x": 560,
                "y": 360
              },
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
                  "sensor_tokens": [
                    "VALVULA_ABERTA",
                    "TEMPERATURA_CRITICA",
                    "BATERIA_DRONE"
                  ],
                  "hint": "Alivie a pressão se a válvula NÃO estiver aberta (NOT) E a temperatura estiver crítica com bateria."
                },
                {
                  "id": "proto_delta_pulso",
                  "type": "DELTA",
                  "title": "Protocolo Delta — Pulso Eletromagnético",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "CIRCUITO_A",
                    "CIRCUITO_B",
                    "BATERIA_DRONE"
                  ],
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
              "coordinates": {
                "x": 280,
                "y": 260
              },
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
                  "sensor_tokens": [
                    "CIRCUITO_A",
                    "CIRCUITO_B",
                    "BATERIA_DRONE"
                  ],
                  "hint": "Autorize a eclusa aplicando pulso exclusivo em apenas UM dos circuitos (XOR) com bateria."
                },
                {
                  "id": "proto_bravo_espuma",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Inundação de Espuma",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "FOGO_ATIVO",
                    "GAS_TOXICO",
                    "BATERIA_DRONE"
                  ],
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
              "coordinates": {
                "x": 340,
                "y": 100
              },
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
                  "sensor_tokens": [
                    "CIVIS_DETECTADOS",
                    "GAS_TOXICO",
                    "BATERIA_DRONE"
                  ],
                  "hint": "Resgate com civis E bateria, garantindo ausência de gás (NOT)."
                },
                {
                  "id": "proto_charlie_gerador",
                  "type": "CHARLIE",
                  "title": "Protocolo Charlie — Reativação da Antena",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "ENERGIA_ESTAVEL",
                    "BATERIA_DRONE",
                    "FOGO_ATIVO"
                  ],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Vidas humanas primeiro! Evacue os operadores (Alpha) antes de tentar salvar a antena."
                },
                {
                  "id": "proto_delta_pulso",
                  "type": "DELTA",
                  "title": "Protocolo Delta — Pulso Eletromagnético",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "CIRCUITO_A",
                    "CIRCUITO_B",
                    "BATERIA_DRONE"
                  ],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: O pulso queimaria os aparelhos de rádio sobreviventes. Execute Protocolo Alpha."
                },
                {
                  "id": "proto_bravo_quimico",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Retardante",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "FOGO_ATIVO",
                    "CIVIS_DETECTADOS",
                    "BATERIA_DRONE"
                  ],
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
              "coordinates": {
                "x": 160,
                "y": 240
              },
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
                  "sensor_tokens": [
                    "CIRCUITO_A",
                    "CIRCUITO_B",
                    "BATERIA_DRONE"
                  ],
                  "hint": "Pulso exclusivo: CIRCUITO_A XOR CIRCUITO_B com bateria disponível."
                },
                {
                  "id": "proto_alpha_evac",
                  "type": "ALPHA",
                  "title": "Protocolo Alpha — Evacuação",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "CIVIS_DETECTADOS",
                    "GAS_TOXICO",
                    "BATERIA_DRONE"
                  ],
                  "tactical_reject_reason": "REJEIÇÃO TÁTICA: Impossível evacuar antes de destravar as portas blindadas com Protocolo Delta!"
                },
                {
                  "id": "proto_bravo_espuma",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Contenção",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "FOGO_ATIVO",
                    "GAS_TOXICO",
                    "BATERIA_DRONE"
                  ],
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
              "coordinates": {
                "x": 480,
                "y": 380
              },
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
                  "sensor_tokens": [
                    "TEMPERATURA_CRITICA",
                    "SISTEMA_REFRIGERACAO",
                    "BATERIA_DRONE"
                  ],
                  "hint": "Refrigere se a temperatura estiver crítica E o sistema NÃO estiver refrigerando (NOT) com bateria."
                },
                {
                  "id": "proto_bravo_extintor",
                  "type": "BRAVO",
                  "title": "Protocolo Bravo — Retardante",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "FOGO_ATIVO",
                    "CIVIS_DETECTADOS",
                    "BATERIA_DRONE"
                  ],
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
              "coordinates": {
                "x": 260,
                "y": 480
              },
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
                  "sensor_tokens": [
                    "CIVIS_DETECTADOS",
                    "GAS_TOXICO",
                    "BATERIA_DRONE"
                  ],
                  "hint": "Finalize a temporada: civis presentes E bateria do drone, garantindo ausência de gás (NOT)."
                },
                {
                  "id": "proto_delta_pulso",
                  "type": "DELTA",
                  "title": "Protocolo Delta — Pulso Magnético",
                  "is_correct_protocol": false,
                  "sensor_tokens": [
                    "CIRCUITO_A",
                    "CIRCUITO_B",
                    "BATERIA_DRONE"
                  ],
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
window.LEVELS_DATA;

window.I18N_DATA = {
  "pt-br": {
    "game_title": "Operação NEXO: Comando & Resgate",
    "game_subtitle": "Centro de Comando Tático — Defesa Civil & Resgate",
    "mode_ranked": "Desafio Diário (Ranqueado)",
    "mode_training": "Central de Treinamento",
    "manual_title": "📖 Manual Lógico do Comandante (Tabela-Verdade)",
    "manual_and": "Ambas as condições devem ser verdadeiras para autorizar o protocolo.",
    "manual_or": "Basta uma das condições ser verdadeira para autorizar o protocolo.",
    "manual_not": "Inverte a polaridade do sensor. NOT(GÁS) é VERDADEIRO quando NÃO há gás no local.",
    "manual_xor": "Apenas UMA das condições pode ser verdadeira, nunca ambas ao mesmo tempo.",
    "victory_title": "SETOR PACIFICADO COM SUCESSO!",
    "gameover_title": "FALHA OPERACIONAL!"
  },
  "en": {
    "game_title": "Operation NEXO: Command & Rescue",
    "game_subtitle": "Tactical Command Center — Civil Defense & Rescue",
    "mode_ranked": "Daily Challenge (Ranked)",
    "mode_training": "Training Operations",
    "manual_title": "📖 Commander's Logic Manual (Truth Table)",
    "manual_and": "Both conditions must be true to authorize protocol execution.",
    "manual_or": "At least one condition must be true to authorize action.",
    "manual_not": "Inverts sensor state. NOT(GAS) is TRUE when there is NO gas present.",
    "manual_xor": "Only ONE condition must be true, never both simultaneously.",
    "victory_title": "SECTOR SECURED SUCCESSFULLY!",
    "gameover_title": "TACTICAL MISSION FAILURE!"
  }
};
window.I18N_DATA;

  // CORE & SYSTEMS

/**
 * ============================================================================
 * EventBus — Barramento de Eventos Desacoplado (Operação NEXO)
 * ============================================================================
 */
class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
  }

  emit(eventName, data = null) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach(callback => {
      try {
        callback(data);
      } catch (err) {
        console.error(`[EventBus] Erro ao executar ouvinte do evento "${eventName}":`, err);
      }
    });
  }
}

/**
 * ============================================================================
 * AudioSystem — Síntese Sonora Militar & Beeps Táticos (Web Audio API)
 * ============================================================================
 */
class AudioSystem {
  constructor(eventBus) {
    this.bus = eventBus;
    this.ctx = null;
    this.volume = 0.4;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.1, startDelay = 0) {
    this.init();
    if (!this.ctx) return;

    try {
      const startTime = this.ctx.currentTime + startDelay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(this.volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {}
  }

  playClick() {
    this.playTone(800, 'triangle', 0.04);
  }

  playRadarPing() {
    this.playTone(1200, 'sine', 0.1);
  }

  playSuccess() {
    this.playTone(440, 'triangle', 0.1, 0);
    this.playTone(554.37, 'triangle', 0.1, 0.08);
    this.playTone(659.25, 'triangle', 0.2, 0.16);
  }

  playError() {
    this.playTone(180, 'sawtooth', 0.2);
  }

  playHint() {
    this.playTone(950, 'sine', 0.15);
  }

  playDroneFlight() {
    this.playTone(120, 'sine', 0.08);
  }
}

  // RENDER ENGINE & SPRITE BANK

/**
 * ============================================================================
 * SpriteBank — Catálogo Centralizado de Assets Urbanos & Edificações
 * ============================================================================
 * Carrega e indexa todas as categorias de sprites (Casas, Prédios, Torres,
 * Praças, Ruas, Terrenos e Alvos de Missão) para acoplamento procedural na grade.
 */

class SpriteBank {
  constructor() {
    this.images = new Map();
    this.loadedCount = 0;
    this.totalCount = 0;

    const residentialFiles = [
      // Sprites Painterly Satélite HD (Lote 1)
      'res_house_simple.png',
      'res_house_backyard.png',
      'res_house_twostory.png',
      'res_duplex.png',
      'res_vila.png'
    ];

    const commercialFiles = [
      // Sprites Painterly Satélite HD (Lote 3)
      'comm_strip_mall.png',
      'comm_office_rooftop_garden.png',
      'comm_supercenter_dock.png'
    ];

    const skyscraperFiles = [
      // Sprites Painterly Satélite HD (Lote 3)
      'comm_skyscraper_helipad.png'
    ];

    const parkFiles = [
      // Sprites Painterly Satélite HD (Lote 2)
      'park_plaza_fountain.png',
      'park_dense_trees.png',
      'park_garden.png',
      'park_playground.png',
      'park_neighborhood.png'
    ];

    const industrialFiles = [
      // Sprites Painterly Satélite HD (Lote 4)
      'ind_electrical_substation.png',
      'ind_fuel_storage_tanks.png',
      'ind_water_treatment.png',
      'ind_container_yard.png'
    ];

    this.catalog = {
      heroes: [
        { id: 'hospital_regional', src: './assets/sprites/buildings/hospital_regional.jpg' },
        { id: 'escola_municipal', src: './assets/sprites/buildings/escola_municipal.jpg' },
        { id: 'subestacao_eletrica', src: './assets/sprites/buildings/subestacao_eletrica.jpg' },
        { id: 'fabrica_quimica', src: './assets/sprites/buildings/fabrica_quimica.jpg' },
        { id: 'prefeitura_civica', src: './assets/sprites/buildings/prefeitura_civica.jpg' },
        // Novos Heróis e Equipamentos Públicos (Lote 5)
        { id: 'pub_fire_station', src: './assets/sprites/buildings/pub_fire_station.jpeg' },
        { id: 'pub_field_hospital_triage', src: './assets/sprites/buildings/pub_field_hospital_triage.jpeg' },
        { id: 'pub_telecom_center', src: './assets/sprites/buildings/pub_telecom_center.jpeg' },
        // Alvos Industriais e Comerciais Estratégicos
        { id: 'ind_electrical_substation', src: './assets/sprites/buildings/ind_electrical_substation.png' },
        { id: 'ind_fuel_storage_tanks', src: './assets/sprites/buildings/ind_fuel_storage_tanks.png' },
        { id: 'ind_water_treatment', src: './assets/sprites/buildings/ind_water_treatment.png' },
        { id: 'ind_container_yard', src: './assets/sprites/buildings/ind_container_yard.png' },
        { id: 'comm_skyscraper_helipad', src: './assets/sprites/buildings/comm_skyscraper_helipad.png' }
      ],
      residential: residentialFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
      commercial: commercialFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
      skyscrapers: skyscraperFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
      parks: parkFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
      industrial: industrialFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
      parks_foliage: [
        ...parkFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
        { id: 'tree_large.png', src: './assets/sprites/urban/tree_large.png' },
        { id: 'tree_small.png', src: './assets/sprites/urban/tree_small.png' }
      ],
      terrain: [
        { id: 'land_grass01.png', src: './assets/sprites/urban/land_grass01.png' },
        { id: 'land_grass02.png', src: './assets/sprites/urban/land_grass02.png' },
        { id: 'land_grass03.png', src: './assets/sprites/urban/land_grass03.png' }
      ]
    };

    this.preloadAll();
  }

  preloadAll() {
    const allItems = [
      ...this.catalog.heroes,
      ...this.catalog.residential,
      ...this.catalog.commercial,
      ...this.catalog.skyscrapers,
      ...this.catalog.industrial,
      ...this.catalog.parks_foliage,
      ...this.catalog.terrain,
      { id: 'drone', src: './assets/sprites/drone.png' },
      { id: 'map_satellite', src: './assets/sprites/map_satellite.png' }
    ];

    this.totalCount = allItems.length;

    allItems.forEach(item => {
      const img = new Image();
      img.onload = () => {
        this.loadedCount++;
      };
      img.onerror = () => {
        this.loadedCount++;
      };
      img.src = item.src;
      this.images.set(item.id, img);
    });
  }

  get(id) {
    return this.images.get(id) || null;
  }

  has(id) {
    const img = this.images.get(id);
    return img && img.naturalWidth > 0;
  }

  getRandom(category, randFn = Math.random) {
    const list = this.catalog[category];
    if (!list || list.length === 0) return null;
    const idx = Math.floor(randFn() * list.length);
    return list[idx];
  }
}

/**
 * ============================================================================
 * CityGridEngine — Motor de Montagem Procedural & Acoplamento na Grade
 * ============================================================================
 * Sorteia e acopla dinamicamente na matriz 8x6 (48 quarteirões) diferentes
 * tipos de casas, prédios, arranha-céus, praças e os alvos heróicos da missão.
 */

class CityGridEngine {
  constructor(cols = 6, rows = 4) {
    this.cols = cols;
    this.rows = rows;
    this.cachedGrid = null;
    this.cachedKey = "";

    this.residentialSprites = [
      // Sprites Painterly Satélite HD (Lote 1)
      "res_house_simple.png",
      "res_house_backyard.png",
      "res_house_twostory.png",
      "res_duplex.png",
      "res_vila.png"
    ];

    this.commercialSprites = [
      // Sprites Painterly Satélite HD (Lote 3)
      "comm_strip_mall.png",
      "comm_office_rooftop_garden.png",
      "comm_supercenter_dock.png"
    ];

    this.skyscraperSprites = [
      // Sprites Painterly Satélite HD (Lote 3)
      "comm_skyscraper_helipad.png"
    ];

    this.parkSprites = [
      // Sprites Painterly Satélite HD (Lote 2)
      "park_plaza_fountain.png",
      "park_dense_trees.png",
      "park_garden.png",
      "park_playground.png",
      "park_neighborhood.png"
    ];

    this.industrialSprites = [
      // Sprites Painterly Satélite HD (Lote 4)
      "ind_electrical_substation.png",
      "ind_fuel_storage_tanks.png",
      "ind_water_treatment.png",
      "ind_container_yard.png"
    ];
  }

  getGridCell(normX, normY) {
    const col = Math.min(this.cols - 1, Math.max(0, Math.floor(normX * this.cols)));
    const row = Math.min(this.rows - 1, Math.max(0, Math.floor(normY * this.rows)));
    return { col, row };
  }

  getCellCenter(col, row, width, height) {
    const cellW = width / this.cols;
    const cellH = height / this.rows;
    return {
      x: (col + 0.5) * cellW,
      y: (row + 0.5) * cellH,
      cellW,
      cellH
    };
  }

  generateLayout(missionId, dailySeed = 42, stages = []) {
    const stageIds = stages.map(s => s.stage_id || s.sector_id || s.sector_name || "").join("-");
    const key = (missionId || "nexo") + "_" + dailySeed + "_" + stageIds + "_" + this.cols + "x" + this.rows;
    if (this.cachedGrid && this.cachedKey === key) {
      return this.cachedGrid;
    }

    // PRNG determinístico
    let seedValue = 0;
    for (let i = 0; i < key.length; i++) {
      seedValue = (seedValue << 5) - seedValue + key.charCodeAt(i);
      seedValue |= 0;
    }
    const rand = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280;
      return seedValue / 233280;
    };

    // 1. Mapear nós da missão para células da grade com garantia de unicidade
    const targetCells = new Map();
    const occupiedCoords = new Set();

    stages.forEach((stage, idx) => {
      const coords = stage.coordinates || { x: 140 + idx * 160, y: 120 + idx * 90 };
      const normX = Math.min(0.92, Math.max(0.08, coords.x / 700));
      const normY = Math.min(0.92, Math.max(0.08, coords.y / 520));
      let cell = this.getGridCell(normX, normY);
      let cellKey = cell.col + "," + cell.row;

      // Se a célula já estiver ocupada, busca a vizinha livre mais próxima
      if (occupiedCoords.has(cellKey)) {
        let found = false;
        for (let rad = 1; rad < Math.max(this.cols, this.rows); rad++) {
          for (let dc = -rad; dc <= rad; dc++) {
            for (let dr = -rad; dr <= rad; dr++) {
              const nc = Math.min(this.cols - 1, Math.max(0, cell.col + dc));
              const nr = Math.min(this.rows - 1, Math.max(0, cell.row + dr));
              const candidateKey = nc + "," + nr;
              if (!occupiedCoords.has(candidateKey)) {
                cell = { col: nc, row: nr };
                cellKey = candidateKey;
                found = true;
                break;
              }
            }
            if (found) break;
          }
          if (found) break;
        }
      }

      occupiedCoords.add(cellKey);
      targetCells.set(cellKey, {
        stageIdx: idx,
        stageData: stage
      });
    });

    // 2. Sorteio do Mega-Parque 2x2 (No máximo 1 ou nenhuma praça por mapa)
    let megaParkAnchor = null;
    const megaParkCells = new Set();
    const wantsPark = rand() < 0.65; // ~65% de chance de ter 1 parque 2x2

    if (wantsPark) {
      const validSpots = [];
      for (let r = 0; r <= this.rows - 2; r++) {
        for (let c = 0; c <= this.cols - 2; c++) {
          const k00 = c + "," + r;
          const k10 = (c + 1) + "," + r;
          const k01 = c + "," + (r + 1);
          const k11 = (c + 1) + "," + (r + 1);

          if (!occupiedCoords.has(k00) && !occupiedCoords.has(k10) && !occupiedCoords.has(k01) && !occupiedCoords.has(k11)) {
            validSpots.push({ col: c, row: r });
          }
        }
      }

      if (validSpots.length > 0) {
        const chosenSpot = validSpots[Math.floor(rand() * validSpots.length)];
        const parkIdx = Math.floor(rand() * this.parkSprites.length);
        const parkSprite = this.parkSprites[parkIdx];

        megaParkAnchor = {
          col: chosenSpot.col,
          row: chosenSpot.row,
          spanCols: 2,
          spanRows: 2,
          spriteKey: parkSprite
        };

        const k00 = chosenSpot.col + "," + chosenSpot.row;
        const k10 = (chosenSpot.col + 1) + "," + chosenSpot.row;
        const k01 = chosenSpot.col + "," + (chosenSpot.row + 1);
        const k11 = (chosenSpot.col + 1) + "," + (chosenSpot.row + 1);

        megaParkCells.add(k00);
        megaParkCells.add(k10);
        megaParkCells.add(k01);
        megaParkCells.add(k11);
      }
    }

    const grid = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cellKey = c + "," + r;

        if (targetCells.has(cellKey)) {
          // --- ALVO DE EMERGÊNCIA (HERO) ---
          const target = targetCells.get(cellKey);
          const nameLower = (target.stageData.sector_name || "").toLowerCase();
          let spriteKey = "escola_municipal";

          if (nameLower.includes("bombeir") || nameLower.includes("incênd") || nameLower.includes("incend") || nameLower.includes("fogo") || nameLower.includes("resgate")) {
            spriteKey = "pub_fire_station";
          } else if (nameLower.includes("triag") || nameLower.includes("tenda") || nameLower.includes("campanha") || nameLower.includes("posto de saúde")) {
            spriteKey = "pub_field_hospital_triage";
          } else if (nameLower.includes("hosp") || nameLower.includes("médic") || nameLower.includes("saude") || nameLower.includes("saúde") || nameLower.includes("urgên")) {
            spriteKey = "hospital_regional";
          } else if (nameLower.includes("telecom") || nameLower.includes("antena") || nameLower.includes("comunic") || nameLower.includes("satél") || nameLower.includes("satel") || nameLower.includes("radar")) {
            spriteKey = "pub_telecom_center";
          } else if (nameLower.includes("subest") || nameLower.includes("energ") || nameLower.includes("elétr") || nameLower.includes("eletro") || nameLower.includes("alta tensão")) {
            spriteKey = "ind_electrical_substation";
          } else if (nameLower.includes("água") || nameLower.includes("agua") || nameLower.includes("eta") || nameLower.includes("filtr") || nameLower.includes("saneam")) {
            spriteKey = "ind_water_treatment";
          } else if (nameLower.includes("tanque") || nameLower.includes("combust") || nameLower.includes("petro") || nameLower.includes("oleo") || nameLower.includes("óleo")) {
            spriteKey = "ind_fuel_storage_tanks";
          } else if (nameLower.includes("contain") || nameLower.includes("contein") || nameLower.includes("porto") || nameLower.includes("doca") || nameLower.includes("logíst") || nameLower.includes("galpão")) {
            spriteKey = "ind_container_yard";
          } else if (nameLower.includes("heliponto") || nameLower.includes("aurora") || nameLower.includes("torre") || nameLower.includes("corporat") || nameLower.includes("arranha")) {
            spriteKey = "comm_skyscraper_helipad";
          } else if (nameLower.includes("quim") || nameLower.includes("quím") || nameLower.includes("fabri") || nameLower.includes("fábri") || nameLower.includes("refin") || nameLower.includes("indús") || nameLower.includes("indus") || nameLower.includes("gás")) {
            spriteKey = "fabrica_quimica";
          } else if (nameLower.includes("pref") || nameLower.includes("gov") || nameLower.includes("civic") || nameLower.includes("cívic") || nameLower.includes("forum") || nameLower.includes("fórum") || nameLower.includes("centro")) {
            spriteKey = "prefeitura_civica";
          } else if (nameLower.includes("escol") || nameLower.includes("univer") || nameLower.includes("coleg") || nameLower.includes("colég") || nameLower.includes("aluno")) {
            spriteKey = "escola_municipal";
          } else {
            const fallbackList = [
              "pub_fire_station",
              "pub_field_hospital_triage",
              "comm_skyscraper_helipad",
              "escola_municipal",
              "hospital_regional",
              "ind_electrical_substation",
              "fabrica_quimica",
              "prefeitura_civica",
              "ind_water_treatment",
              "pub_telecom_center"
            ];
            spriteKey = fallbackList[target.stageIdx % fallbackList.length];
          }

          grid.push({
            col: c,
            row: r,
            isTarget: true,
            isMegaPark: false,
            isMegaParkChild: false,
            stageIdx: target.stageIdx,
            stageData: target.stageData,
            structure: {
              category: "hero",
              type: "target_hero",
              name: target.stageData.sector_name || "Alvo de Resgate",
              spriteKey: spriteKey,
              ground: "hero_pavement"
            }
          });
        } else if (megaParkAnchor && c === megaParkAnchor.col && r === megaParkAnchor.row) {
          // --- ÂNCORA DO MEGA-PARQUE 2x2 ---
          grid.push({
            col: c,
            row: r,
            isTarget: false,
            isMegaPark: true,
            isMegaParkChild: false,
            megaParkData: megaParkAnchor,
            stageIdx: -1,
            stageData: null,
            structure: {
              category: "parks_foliage",
              type: "urban_mega_park",
              name: "Grande Praça Cívica",
              spriteKey: megaParkAnchor.spriteKey,
              ground: "park"
            }
          });
        } else if (megaParkCells.has(cellKey)) {
          // --- CÉLULA FILHA DO MEGA-PARQUE 2x2 (Coberta pela âncora) ---
          grid.push({
            col: c,
            row: r,
            isTarget: false,
            isMegaPark: false,
            isMegaParkChild: true,
            megaParkAnchor: { col: megaParkAnchor.col, row: megaParkAnchor.row },
            stageIdx: -1,
            stageData: null,
            structure: {
              category: "parks_foliage",
              type: "urban_mega_park_child",
              name: "Grande Praça Cívica",
              spriteKey: megaParkAnchor.spriteKey,
              ground: "park"
            }
          });
        } else {
          // --- DEMAIS QUARTEIRÕES: EXCLUSIVAMENTE CASAS RESIDENCIAIS ---
          const resIdx = Math.floor(rand() * this.residentialSprites.length);
          grid.push({
            col: c,
            row: r,
            isTarget: false,
            isMegaPark: false,
            isMegaParkChild: false,
            stageIdx: -1,
            stageData: null,
            structure: {
              category: "residential",
              type: "suburban_house",
              name: "Residência Urbana",
              spriteKey: this.residentialSprites[resIdx],
              ground: "residential"
            }
          });
        }
      }
    }

    this.cachedGrid = grid;
    this.cachedKey = key;
    return grid;
  }
}


class MapRenderer {
  constructor(canvas, spriteBank = null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.rotorAngle = 0;
    this.bank = spriteBank || new SpriteBank();
    this.gridEngine = new CityGridEngine(6, 4);

    this.smoke = [];
    for (let i = 0; i < 28; i++) {
      this.smoke.push({
        x: 180 + (Math.random() * 30 - 15),
        y: 140 + (Math.random() * 30 - 15),
        r: Math.random() * 8 + 4,
        a: Math.random() * 0.5 + 0.2,
        sp: Math.random() * 0.4 + 0.2
      });
    }

    this.currentMapSrc = "";
    this.mapLoaded = false;

    // Vídeo Feed do Drone Militar com Hélices em Rotação
    this.droneVideo = document.createElement("video");
    this.droneVideo.src = "./assets/sprites/drone_square_512.mp4";
    this.droneVideo.loop = true;
    this.droneVideo.muted = true;
    this.droneVideo.playsInline = true;
    this.droneVideo.autoplay = true;
    this.droneVideo.setAttribute("playsinline", "");
    this.droneVideo.setAttribute("webkit-playsinline", "");
    this.droneVideo.style.cssText = "position:fixed; top:-9999px; left:-9999px; width:1px; height:1px; opacity:0; pointer-events:none;";
    if (typeof document !== "undefined" && document.body) {
      document.body.appendChild(this.droneVideo);
    }
    
    const triggerPlay = () => {
      if (this.droneVideo && this.droneVideo.paused) {
        this.droneVideo.play().catch(() => {});
      }
    };
    triggerPlay();
    if (typeof window !== "undefined") {
      window.addEventListener("pointerdown", triggerPlay, { passive: true });
      window.addEventListener("keydown", triggerPlay, { passive: true });
    }
  }

  loadMap(imageSrc) {
    const src = imageSrc || "./assets/sprites/map_satellite.png";
    if (this.currentMapSrc === src && this.mapLoaded) return;
    this.currentMapSrc = src;
    this.mapLoaded = false;
    this.mapImg = new Image();
    this.mapImg.onload = () => { this.mapLoaded = true; };
    this.mapImg.onerror = () => { this.mapLoaded = false; };
    this.mapImg.src = src;
  }

  resize(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
  }

  getSectorScreenPosition(sector, stages, width, height) {
    if (!sector) return { x: width * 0.5, y: height * 0.5 };
    const coords = sector.coordinates || { x: 180, y: 140 };
    const normX = Math.min(0.92, Math.max(0.08, coords.x / 700));
    const normY = Math.min(0.92, Math.max(0.08, coords.y / 520));
    const cell = this.gridEngine.getGridCell(normX, normY);
    const center = this.gridEngine.getCellCenter(cell.col, cell.row, width, height);
    return { x: center.x, y: center.y, cell };
  }

  getStageAtPosition(x, y, stages, width, height) {
    if (!stages || stages.length === 0) return -1;
    const w = width || this.canvas.width || 700;
    const h = height || this.canvas.height || 520;
    const cellW = w / this.gridEngine.cols;
    const cellH = h / this.gridEngine.rows;

    for (let i = 0; i < stages.length; i++) {
      const pos = this.getSectorScreenPosition(stages[i], stages, w, h);
      if (pos && pos.cell) {
        const x0 = pos.cell.col * cellW;
        const x1 = (pos.cell.col + 1) * cellW;
        const y0 = pos.cell.row * cellH;
        const y1 = (pos.cell.row + 1) * cellH;

        if (x >= x0 && x <= x1 && y >= y0 && y <= y1) {
          return i;
        }
      }
    }
    return -1;
  }

  render(drone, sector, waypoint, threatRatio = 0, currentMission = null, activeStageIdx = 0, resolvedStages = new Set(), stageReports = []) {
    const ctx = this.ctx;
    const w = this.canvas.width || 700;
    const h = this.canvas.height || 520;

    // 1. Camada 0: Base de Satélite / Solo Terrestre
    if (this.mapLoaded && this.mapImg && this.mapImg.naturalWidth > 0) {
      const imgW = this.mapImg.naturalWidth;
      const imgH = this.mapImg.naturalHeight;
      const scale = Math.max(w / imgW, h / imgH);
      const renderW = imgW * scale;
      const renderH = imgH * scale;
      const offsetX = (w - renderW) / 2;
      const offsetY = (h - renderH) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(this.mapImg, offsetX, offsetY, renderW, renderH);

      // Filtro tático
      ctx.fillStyle = "rgba(16, 20, 24, 0.35)";
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.fillStyle = "#182026";
      ctx.fillRect(0, 0, w, h);
    }

    // 2. Camada 1: Malha Urbana Realista (Ruas, Calçadas e Quarteirões Procedurais)
    const fallbackStages = (window.LEVELS_DATA && window.LEVELS_DATA.temporadas && window.LEVELS_DATA.temporadas[0] && window.LEVELS_DATA.temporadas[0].weeks[0]) ? window.LEVELS_DATA.temporadas[0].weeks[0].stages : [];
    const stages = (currentMission && currentMission.stages && currentMission.stages.length > 0) ? currentMission.stages : (sector ? [sector] : fallbackStages);
    const missionId = currentMission ? (currentMission.id || currentMission.title) : "nexo_default";
    const gridLayout = this.gridEngine.generateLayout(missionId, 42, stages);

    const cols = this.gridEngine.cols;
    const rows = this.gridEngine.rows;
    const cellW = w / cols;
    const cellH = h / rows;
    const roadWidth = Math.max(12, Math.round(cellW * 0.16));
    const roadHalf = roadWidth * 0.5;

    // 2.1 Pavimentação de Asfalto (Malha Viária Contínua)
    ctx.save();
    ctx.fillStyle = "#181d22"; // Asfalto escuro
    for (let r = 0; r <= rows; r++) {
      const y = r * cellH;
      ctx.fillRect(0, y - roadHalf, w, roadWidth);
    }
    for (let c = 0; c <= cols; c++) {
      const x = c * cellW;
      ctx.fillRect(x - roadHalf, 0, roadWidth, h);
    }

    // 2.2 Pintura de Faixas de Trânsito (Linhas Centrais nas Ruas)
    ctx.strokeStyle = "rgba(220, 226, 235, 0.4)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);

    // Linhas horizontais nas ruas (entre quarteirões)
    for (let r = 0; r <= rows; r++) {
      const y = r * cellH;
      for (let c = 0; c < cols; c++) {
        const xStart = c * cellW + roadHalf + 4;
        const xEnd = (c + 1) * cellW - roadHalf - 4;
        if (xEnd > xStart) {
          ctx.beginPath();
          ctx.moveTo(xStart, y);
          ctx.lineTo(xEnd, y);
          ctx.stroke();
        }
      }
    }

    // Linhas verticais nas ruas (entre quarteirões)
    for (let c = 0; c <= cols; c++) {
      const x = c * cellW;
      for (let r = 0; r < rows; r++) {
        const yStart = r * cellH + roadHalf + 4;
        const yEnd = (r + 1) * cellH - roadHalf - 4;
        if (yEnd > yStart) {
          ctx.beginPath();
          ctx.moveTo(x, yStart);
          ctx.lineTo(x, yEnd);
          ctx.stroke();
        }
      }
    }
    ctx.setLineDash([]);

    // 2.3 Faixas de Pedestres nas Esquinas dos Cruzamentos
    ctx.fillStyle = "rgba(235, 240, 245, 0.35)";
    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r <= rows; r++) {
        const cx = c * cellW;
        const cy = r * cellH;
        // Faixas norte/sul
        if (r > 0 && r < rows) {
          ctx.fillRect(cx - roadHalf + 2, cy - roadHalf - 3, roadWidth - 4, 2);
          ctx.fillRect(cx - roadHalf + 2, cy + roadHalf + 1, roadWidth - 4, 2);
        }
        // Faixas leste/oeste
        if (c > 0 && c < cols) {
          ctx.fillRect(cx - roadHalf - 3, cy - roadHalf + 2, 2, roadWidth - 4);
          ctx.fillRect(cx + roadHalf + 1, cy - roadHalf + 2, 2, roadWidth - 4);
        }
      }
    }
    ctx.restore();

    // 2.4 Renderização dos Quarteirões, Praças & Edificações
    gridLayout.forEach(cell => {
      // Se for célula filha do mega-parque 2x2, a âncora já cuidou de renderizar o superbloco
      if (cell.isMegaParkChild) {
        return;
      }

      if (cell.isMegaPark) {
        // --- GRANDE PRAÇA / MEGA-PARQUE 2x2 ---
        const blockX = cell.col * cellW + roadHalf;
        const blockY = cell.row * cellH + roadHalf;
        const blockW = cellW * 2 - roadWidth;
        const blockH = cellH * 2 - roadWidth;

        // Calçada de concreto contornando a mega-praça
        ctx.fillStyle = "#333d47";
        ctx.fillRect(blockX, blockY, blockW, blockH);
        ctx.strokeStyle = "#465360";
        ctx.lineWidth = 1;
        ctx.strokeRect(blockX, blockY, blockW, blockH);

        const curbSize = 2;
        const bx = blockX + curbSize;
        const by = blockY + curbSize;
        const bw = blockW - curbSize * 2;
        const bh = blockH - curbSize * 2;

        // Base vetorial rica do parque (garantia imediata)
        ctx.fillStyle = "#224c2d";
        ctx.fillRect(bx, by, bw, bh);

        // Caminhos de pedestres internos
        ctx.fillStyle = "#3a4d3f";
        ctx.fillRect(bx + bw * 0.44, by, bw * 0.12, bh);
        ctx.fillRect(bx, by + bh * 0.44, bw, bh * 0.12);

        // Fonte / Lago central
        ctx.fillStyle = "#2b6b85";
        ctx.beginPath();
        ctx.arc(bx + bw * 0.5, by + bh * 0.5, Math.min(bw, bh) * 0.18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#458da8";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Árvores nas 4 esquinas do parque
        ctx.fillStyle = "#173820";
        ctx.beginPath();
        ctx.arc(bx + bw * 0.22, by + bh * 0.22, Math.min(bw, bh) * 0.12, 0, Math.PI * 2);
        ctx.arc(bx + bw * 0.78, by + bh * 0.22, Math.min(bw, bh) * 0.12, 0, Math.PI * 2);
        ctx.arc(bx + bw * 0.22, by + bh * 0.78, Math.min(bw, bh) * 0.12, 0, Math.PI * 2);
        ctx.arc(bx + bw * 0.78, by + bh * 0.78, Math.min(bw, bh) * 0.12, 0, Math.PI * 2);
        ctx.fill();

        // Sobreposição da textura HD se disponível
        const parkImg = this.bank.get(cell.structure.spriteKey);
        if (parkImg && parkImg.naturalWidth > 0) {
          ctx.drawImage(parkImg, bx, by, bw, bh);
        }
        return;
      }

      // Coordenadas do lote dentro do quarteirão delimitado pelas ruas
      const blockX = cell.col * cellW + roadHalf;
      const blockY = cell.row * cellH + roadHalf;
      const blockW = cellW - roadWidth;
      const blockH = cellH - roadWidth;

      // Calçada de concreto contornando o quarteirão
      ctx.fillStyle = "#333d47";
      ctx.fillRect(blockX, blockY, blockW, blockH);

      // Meio-fio de borda
      ctx.strokeStyle = "#465360";
      ctx.lineWidth = 1;
      ctx.strokeRect(blockX, blockY, blockW, blockH);

      // Lote interno (terreno privativo)
      const curbSize = 2;
      const bx = blockX + curbSize;
      const by = blockY + curbSize;
      const bw = blockW - curbSize * 2;
      const bh = blockH - curbSize * 2;

      if (cell.isTarget) {
        // --- ALVO HERO DA MISSÃO ---
        const isResolved = resolvedStages && (resolvedStages.has(cell.stageIdx) || (cell.stageData && resolvedStages.has(cell.stageData.stage_id)));
        const isActive = (cell.stageIdx === activeStageIdx) && !isResolved;

        // Base vetorial do alvo (garantia imediata)
        ctx.fillStyle = isResolved ? "#183020" : (isActive ? "#182635" : "#222c36");
        ctx.fillRect(bx, by, bw, bh);

        // Estrutura predial estilizada
        ctx.fillStyle = isResolved ? "#264a32" : (isActive ? "#2a3d52" : "#323e4b");
        ctx.fillRect(bx + 4, by + 4, bw - 8, bh - 8);

        // Marcação do heliponto / pátio operacional
        ctx.strokeStyle = isResolved ? "#4ec95c" : (isActive ? "#64b5f6" : "#e5a00d");
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(bx + bw * 0.5, by + bh * 0.5, Math.min(bw, bh) * 0.22, 0, Math.PI * 2);
        ctx.stroke();

        const sKey = cell.structure.spriteKey;
        const heroImg = this.bank.get(sKey);
        if (heroImg && heroImg.naturalWidth > 0) {
          ctx.drawImage(heroImg, bx, by, bw, bh);
        }

        const stageChar = String.fromCharCode(65 + Math.max(0, cell.stageIdx));
        const stageReport = (stageReports || []).find(r => r.stageIdx === cell.stageIdx);
        const wasSaved = stageReport ? stageReport.isSaved : true;

        const badgeW = isResolved ? 60 : (isActive ? 64 : 52);
        const badgeH = 24;
        const badgeX = bx + 4;
        const badgeY = by + 4;

        if (isResolved) {
          if (wasSaved) {
            // Estado: Pacificado / Salvo (Verde Militar)
            ctx.strokeStyle = "#4ec95c";
            ctx.lineWidth = 2.5;
            ctx.strokeRect(bx, by, bw, bh);

            ctx.fillStyle = "rgba(12, 30, 18, 0.95)";
            ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
            ctx.strokeStyle = "#4ec95c";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);
            ctx.fillStyle = "#4ec95c";
            ctx.font = "bold 13.5px monospace";
            ctx.fillText("[" + stageChar + "] ✓", badgeX + 6, badgeY + 17);
          } else {
            // Estado: Concluído com Colapso / Não Salvo (Vermelho Alerta)
            ctx.strokeStyle = "#d9534f";
            ctx.lineWidth = 2.5;
            ctx.strokeRect(bx, by, bw, bh);

            ctx.fillStyle = "rgba(35, 14, 14, 0.95)";
            ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
            ctx.strokeStyle = "#d9534f";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);
            ctx.fillStyle = "#ff7777";
            ctx.font = "bold 13.5px monospace";
            ctx.fillText("[" + stageChar + "] 🏚️", badgeX + 5, badgeY + 17);
          }
        } else if (isActive) {
          // Estado: Ativo / Selecionado (Destaque Tático com Foco Azul/Cyan Sóbrio)
          ctx.strokeStyle = "#4a90e2";
          ctx.lineWidth = 3;
          ctx.strokeRect(bx, by, bw, bh);

          ctx.fillStyle = "rgba(16, 26, 38, 0.96)";
          ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
          ctx.strokeStyle = "#64b5f6";
          ctx.lineWidth = 1.8;
          ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);
          ctx.fillStyle = "#e3f2fd";
          ctx.font = "bold 14px monospace";
          ctx.fillText("[" + stageChar + "] 🎯", badgeX + 6, badgeY + 17);
        } else {
          // Estado: Pendente / Próximo Alvo
          ctx.strokeStyle = "rgba(140, 165, 190, 0.6)";
          ctx.lineWidth = 2;
          ctx.strokeRect(bx, by, bw, bh);

          ctx.fillStyle = "rgba(16, 21, 26, 0.94)";
          ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
          ctx.strokeStyle = "rgba(160, 185, 210, 0.7)";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);
          ctx.fillStyle = "#d2dce5";
          ctx.font = "bold 14px monospace";
          ctx.fillText("[ " + stageChar + " ]", badgeX + 6, badgeY + 17);
        }

      } else {
        // --- QUARTEIRÃO RESIDENCIAL PROCEDURAL ---
        const struct = cell.structure || {};
        
        // Base vetorial instantânea (grama do lote + telhado da casa)
        ctx.fillStyle = "#1e2820";
        ctx.fillRect(bx, by, bw, bh);

        // Telhado estilizado com relevo e cor quente/ardósia
        ctx.fillStyle = "#5c3d2e";
        ctx.fillRect(bx + 4, by + 4, bw - 8, bh - 8);
        ctx.strokeStyle = "#7a523e";
        ctx.lineWidth = 1;
        ctx.strokeRect(bx + 4, by + 4, bw - 8, bh - 8);

        // Textura HD sobreposta quando carregada
        if (struct.spriteKey) {
          const bImg = this.bank.get(struct.spriteKey);
          if (bImg && bImg.naturalWidth > 0) {
            ctx.drawImage(bImg, bx, by, bw, bh);
          }
        }
      }
    });

    // 3. Corredor Tático de Voo da Missão
    if (currentMission && currentMission.stages && currentMission.stages.length > 1) {
      this.drawFlightCorridor(ctx, currentMission, activeStageIdx, w, h, resolvedStages);
    }

    // 4. Efeitos Dinâmicos de Emergência (Fumaça, Chamas e Gás)
    if (sector) {
      const isSectorResolved = resolvedStages && (resolvedStages.has(activeStageIdx) || (sector.stage_id && resolvedStages.has(sector.stage_id)));
      const targetPos = this.getSectorScreenPosition(sector, stages, w, h);
      const sx = targetPos.x;
      const sy = targetPos.y;

      if (!isSectorResolved) {
        const spreadFactor = 1 + threatRatio * 1.5;
        const isGas = sector.sensors && sector.sensors.GAS_TOXICO;
        const isFire = sector.sensors && sector.sensors.FOGO_ATIVO !== false;

        this.smoke.forEach(p => {
          p.y -= p.sp * (1 + threatRatio * 0.8);
          if (p.y < sy - 50 * spreadFactor) {
            p.y = sy + (Math.random() * 20 - 10);
            p.x = sx + (Math.random() * 32 - 16) * spreadFactor;
          }

          if (isFire) {
            ctx.fillStyle = "rgba(" + (190 + Math.floor(threatRatio * 65)) + ", " + (70 - Math.floor(threatRatio * 35)) + ", 25, " + (p.a * (0.35 + threatRatio * 0.4)) + ")";
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 + threatRatio * 0.6), 0, Math.PI * 2); ctx.fill();
          }

          if (isGas) {
            ctx.fillStyle = "rgba(100, 190, 45, " + (p.a * (0.3 + threatRatio * 0.35)) + ")";
            ctx.beginPath(); ctx.arc(p.x - 6, p.y + 4, p.r * (1.1 + threatRatio * 0.5), 0, Math.PI * 2); ctx.fill();
          }

          ctx.fillStyle = "rgba(35, 40, 45, " + (p.a * (0.5 + threatRatio * 0.3)) + ")";
          ctx.beginPath(); ctx.arc(p.x + 4, p.y - 6, p.r * 1.3 * (1 + threatRatio * 0.4), 0, Math.PI * 2); ctx.fill();
        });

        const baseRadius = Math.min(cellW, cellH) * 0.4;
        const expandRadius = baseRadius + threatRatio * 28;
        const pulse = Math.sin(Date.now() / 180) * (2 + threatRatio * 4);

        let perimeterColor = "#4ec95c";
        let label = "SETOR ATIVO (EMERGÊNCIA)";
        if (threatRatio > 0.7) {
          perimeterColor = "#ff3333";
          label = "🚨 COLAPSO IMINENTE!";
        } else if (threatRatio > 0.35) {
          perimeterColor = "#e5a00d";
          label = "⚠️ RISCO ELEVADO";
        }

        ctx.strokeStyle = perimeterColor;
        ctx.lineWidth = threatRatio > 0.7 ? 3 : 2;
        ctx.beginPath();
        ctx.arc(sx, sy, expandRadius + pulse, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = threatRatio > 0.7 ? "rgba(255, 51, 51, 0.22)" : "rgba(224, 75, 71, 0.15)";
        ctx.beginPath();
        ctx.arc(sx, sy, expandRadius + pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = perimeterColor;
        ctx.font = "bold 11px sans-serif";
        ctx.fillText(label, sx - 50, sy - expandRadius - 8);
      } else {
        // Setor Seguro: Aura verde calma
        const baseRadius = Math.min(cellW, cellH) * 0.36;
        ctx.strokeStyle = "rgba(78, 201, 92, 0.6)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sx, sy, baseRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(78, 201, 92, 0.12)";
        ctx.beginPath();
        ctx.arc(sx, sy, baseRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#4ec95c";
        ctx.font = "bold 10px sans-serif";
        ctx.fillText("✅ SETOR SEGURO", sx - 42, sy - baseRadius - 6);
      }
    }

    // 5. Waypoint
    if (waypoint && waypoint.x !== undefined) {
      ctx.strokeStyle = "#e5a00d"; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.arc(waypoint.x, waypoint.y, 12, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(waypoint.x - 16, waypoint.y); ctx.lineTo(waypoint.x + 16, waypoint.y);
      ctx.moveTo(waypoint.x, waypoint.y - 16); ctx.lineTo(waypoint.x, waypoint.y + 16); ctx.stroke();
      ctx.setLineDash([]);
    }

    // 6. Drone Militar Tático com Vídeo/Hélices Animadas
    if (drone) {
      ctx.save();
      ctx.translate(drone.x, drone.y);
      ctx.rotate(drone.angle);

      const drawSize = 46;

      // Sombra projetada no terreno
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
      ctx.beginPath();
      ctx.arc(3, 4, drawSize * 0.38, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (this.droneVideo && this.droneVideo.readyState >= 2) {
        // Tenta garantir reprodução ativa
        if (this.droneVideo.paused) {
          this.droneVideo.play().catch(() => {});
        }
        ctx.drawImage(this.droneVideo, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
      } else {
        const droneImg = this.bank.get("drone");
        if (droneImg && droneImg.naturalWidth > 0) {
          if (drone.isMoving) {
            this.rotorAngle += 0.5;
            ctx.save();
            ctx.rotate(this.rotorAngle);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, 22, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
          ctx.drawImage(droneImg, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
        } else {
          this.rotorAngle += 0.4;
          const rots = [{x:-16,y:-16},{x:16,y:-16},{x:-16,y:16},{x:16,y:16}];
          rots.forEach(pos => {
            ctx.save(); ctx.translate(pos.x, pos.y); ctx.rotate(this.rotorAngle);
            ctx.fillStyle = "rgba(140, 160, 180, 0.7)"; ctx.fillRect(-10, -1.5, 20, 3);
            ctx.restore();
          });

          ctx.fillStyle = "#3b4a3c";
          ctx.beginPath(); ctx.roundRect(-10, -12, 20, 24, 4); ctx.fill();
          ctx.strokeStyle = "#273038"; ctx.stroke();

          ctx.fillStyle = "#e5a00d"; ctx.beginPath(); ctx.arc(0, -10, 3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = "#4ec95c"; ctx.fillRect(-8, 8, 2, 2);
          ctx.fillStyle = "#e04b47"; ctx.fillRect(6, 8, 2, 2);
        }
      }

      ctx.restore();
    }
  }

  drawFlightCorridor(ctx, mission, activeStageIdx, w, h, resolvedStages = new Set()) {
    if (!mission || !mission.stages || mission.stages.length <= 1) return;
    const stages = mission.stages;

    const baseCenter = this.gridEngine.getCellCenter(0, 0, w, h);
    ctx.save();
    ctx.strokeStyle = "rgba(229, 160, 13, 0.35)";
    ctx.lineWidth = 1.2;
    ctx.setLineDash([5, 5]);

    ctx.beginPath();
    ctx.moveTo(baseCenter.x, baseCenter.y);
    stages.forEach(st => {
      const pos = this.getSectorScreenPosition(st, stages, w, h);
      ctx.lineTo(pos.x, pos.y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    stages.forEach((st, idx) => {
      const pos = this.getSectorScreenPosition(st, stages, w, h);
      const { x, y } = pos;
      const isDone = resolvedStages && (resolvedStages.has(idx) || (st.stage_id && resolvedStages.has(st.stage_id)));
      const isActive = (idx === activeStageIdx) && !isDone;

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      if (isDone) {
        ctx.fillStyle = "rgba(78, 201, 92, 0.4)";
        ctx.fill();
        ctx.strokeStyle = "#4ec95c";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "#4ec95c";
        ctx.font = "bold 10px monospace";
        ctx.fillText("✓", x - 4, y + 4);
      } else if (isActive) {
        ctx.fillStyle = "rgba(229, 160, 13, 0.4)";
        ctx.fill();
        ctx.strokeStyle = "#e5a00d";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "#e5a00d";
        ctx.font = "bold 10px monospace";
        ctx.fillText(String.fromCharCode(65 + idx), x - 4, y + 4);
      } else {
        ctx.fillStyle = "rgba(56, 69, 80, 0.35)";
        ctx.fill();
        ctx.strokeStyle = "rgba(229, 160, 13, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = "#d0d7de";
        ctx.font = "bold 10px monospace";
        ctx.fillText(String.fromCharCode(65 + idx), x - 4, y + 4);
      }
      ctx.restore();
    });
  }
}

  // GAMEPLAY & UI

class DroneController {
    constructor(startX, startY) {
      this.x = startX;
      this.y = startY;
      this.targetX = startX;
      this.targetY = startY;
      this.speed = 130;
      this.angle = 0;
      this.isMoving = false;
    }

    setDestination(x, y) {
      this.targetX = x;
      this.targetY = y;
      this.isMoving = true;
    }

    update(dt) {
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 4) {
        this.isMoving = true;
        const targetAngle = Math.atan2(dy, dx) + Math.PI / 2;
        let diff = targetAngle - this.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        this.angle += diff * Math.min(1, dt * 6);

        const moveDist = Math.min(dist, this.speed * dt);
        this.x += (dx / dist) * moveDist;
        this.y += (dy / dist) * moveDist;
      } else {
        this.isMoving = false;
      }
    }
  }

  // 7. HUD TÁTICO & OPERADORES BOOLEANOS

class TacticalHUD {
    constructor(bus, audio) {
      this.bus = bus;
      this.audio = audio;
      this.isNatural = true;
      this.selectedProtoIdx = 0;
      this.polarities = []; // true = NOT, false = DIRETO
      this.slots = ['?', '?']; // Conectivos
      this.activeSlot = 0;
      this.isSituationOpen = false;
      this.isProtoGuideOpen = false;
      this.consoleEl = document.getElementById('lateral-console');
    }

    getOpLabel(op) {
      if (!this.isNatural) return op;
      const map = { 'AND': 'E', 'OR': 'OU', 'NOT': 'NÃO', 'XOR': 'XOR', '?': '?' };
      return map[op] || op;
    }

    getPolarityLabel(isNot) {
      if (!isNot) return '+';
      return this.isNatural ? 'NÃO' : 'NOT';
    }

    getSensorNarrative(sensors) {
      const entries = Object.entries(sensors || {});
      if (entries.length === 0) return 'Nenhum sinal telemétrico detectado na varredura deste setor.';

      const dictionary = {
        CIVIS_DETECTADOS: {
          trueVal: 'há presença de civis',
          falseVal: 'não há civis no local'
        },
        FOGO_ATIVO: {
          trueVal: 'fogo ativo no setor',
          falseVal: 'não possui fogo no momento'
        },
        GAS_TOXICO: {
          trueVal: 'vazamento de gás tóxico',
          falseVal: 'não possui gás'
        },
        BATERIA_DRONE: {
          trueVal: 'a bateria do drone deve ser considerada com carga',
          falseVal: 'a bateria do drone está com carga crítica'
        },
        ENERGIA_ESTAVEL: {
          trueVal: 'a rede de energia está estável',
          falseVal: 'não há energia estável na rede'
        },
        ESTRUTURA_ABALADA: {
          trueVal: 'a estrutura predial está abalada',
          falseVal: 'a estrutura predial permanece íntegra'
        },
        CIRCUITO_A: {
          trueVal: 'o circuito A está energizado',
          falseVal: 'o circuito A está desenergizado'
        },
        CIRCUITO_B: {
          trueVal: 'o circuito B está energizado',
          falseVal: 'o circuito B está desenergizado'
        },
        VALVULA_ABERTA: {
          trueVal: 'a válvula principal está aberta',
          falseVal: 'a válvula principal está fechada'
        },
        TEMPERATURA_CRITICA: {
          trueVal: 'a temperatura está em nível crítico',
          falseVal: 'a temperatura está normalizada'
        },
        SISTEMA_REFRIGERACAO: {
          trueVal: 'o sistema de refrigeração está ativo',
          falseVal: 'o sistema de refrigeração está inoperante'
        }
      };

      const clauses = entries.map(([k, v]) => {
        const item = dictionary[k];
        if (item) {
          return v ? item.trueVal : item.falseVal;
        }
        const friendlyName = k.toLowerCase().replace(/_/g, ' ');
        return v ? `${friendlyName} ativo` : `não possui ${friendlyName}`;
      });

      if (clauses.length === 0) return 'Nenhum dado telemétrico registrado.';

      clauses[0] = clauses[0].charAt(0).toUpperCase() + clauses[0].slice(1);

      if (clauses.length === 1) {
        return `${clauses[0]}.`;
      }
      if (clauses.length === 2) {
        return `${clauses[0]} e ${clauses[1]}.`;
      }

      const allExceptLast = clauses.slice(0, -1).join(', ');
      const last = clauses[clauses.length - 1];
      return `${allExceptLast}, e ${last}.`;
    }

    renderSector(sec, stageIdx = 0, stages = [], resolvedStages = new Set(), missionTitle = '', stageReports = []) {
      this.currentSector = sec;
      this.currentStageIdx = stageIdx;
      this.stages = stages || [];
      this.resolvedStages = resolvedStages || new Set();
      this.totalStages = stages.length || 1;
      this.missionTitle = missionTitle;
      this.stageReports = stageReports || [];

      if (!sec) {
        this.consoleEl.innerHTML = '<div style="padding:30px; text-align:center; color:#888;">🚁 AGUARDANDO DESIGNAR SETOR</div>';
        return;
      }

      const protocols = sec.protocols || [];
      const proto = protocols[this.selectedProtoIdx] || protocols[0];
      const tokens = proto.sensor_tokens || Object.keys(sec.sensors || {}).slice(0, 3);

      if (this.polarities.length !== tokens.length) {
        this.polarities = new Array(tokens.length).fill(false);
      }
      const neededConnectors = Math.max(1, tokens.length - 1);
      if (this.slots.length !== neededConnectors) {
        this.slots = new Array(neededConnectors).fill('?');
      }

      // 1. Relatório da Inteligência (Narrativa Contínua no modo Natural, ou Grade de Códigos no modo Código)
      let sensorsSectionHtml = '';
      if (this.isNatural) {
        const narrativeText = this.getSensorNarrative(sec.sensors);
        sensorsSectionHtml = `
          <div class="sensor-narrative-box">
            <div class="sensor-narrative-body">${narrativeText}</div>
          </div>`;
      } else {
        let codeSensorsHtml = '';
        for (const [k, v] of Object.entries(sec.sensors || {})) {
          codeSensorsHtml += `
            <div class="sensor-box ${v ? 'val-true' : 'val-false'}">
              <span>${k}</span><strong>${v ? '🟢 TRUE' : '⚪ FALSE'}</strong>
            </div>`;
        }
        sensorsSectionHtml = `<div class="sensors-grid">${codeSensorsHtml}</div>`;
      }

      // 2. Abas de Protocolo Minimalistas & Guia Retrátil
      let tabsHtml = '';
      const greekLabels = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot'];
      protocols.forEach((p, idx) => {
        const active = idx === this.selectedProtoIdx ? 'is-active' : '';
        const rawLabel = p.type || greekLabels[idx] || `P${idx + 1}`;
        const cleanLabel = rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1).toLowerCase();
        tabsHtml += `<button class="proto-tab-btn ${active}" data-idx="${idx}" title="${p.title}">${cleanLabel}</button>`;
      });

      const selectedLabel = (proto.type || greekLabels[this.selectedProtoIdx] || `P${this.selectedProtoIdx + 1}`);
      const cleanSelectedLabel = selectedLabel.charAt(0).toUpperCase() + selectedLabel.slice(1).toLowerCase();
      const protoFullTitle = proto.title || `Protocolo ${cleanSelectedLabel}`;
      const protoHint = proto.hint || 'Verifique a leitura dos sensores e conectores lógicos para assegurar a operação.';

      const protoGuideHtml = `
        <details class="proto-guide-accordion" id="proto-guide-details" ${this.isProtoGuideOpen ? 'open' : ''}>
          <summary class="proto-guide-summary">
            <span>ℹ️ Diretriz: Protocolo ${cleanSelectedLabel}</span>
            <span class="situation-chevron">▾</span>
          </summary>
          <div class="proto-guide-content">
            <div style="font-weight:700; color:#dbe4ec; margin-bottom:3px;">📋 ${protoFullTitle}</div>
            <div style="color:#9bb0c2; line-height:1.4;">💡 ${protoHint}</div>
          </div>
        </details>
      `;

      // 3. Fórmula com Polarity Toggles [ + / NOT ] e Conectivos [ ? ] (Pílulas Arredondadas)
      let formulaHtml = '<div style="display:flex; flex-wrap:wrap; align-items:center; gap:6px; font-family:var(--font-mono); font-size:0.88rem;">';
      if (tokens.length >= 2) formulaHtml += '<span style="color:#6e7d8a; font-weight:bold; font-size:1.05rem;">(</span>';

      tokens.forEach((token, idx) => {
        const isNot = !!this.polarities[idx];
        const polClass = isNot ? 'is-not' : 'is-direct';
        const polLabel = this.getPolarityLabel(isNot);

        formulaHtml += `
          <button class="polarity-btn ${polClass}" data-pidx="${idx}" title="Alternar Direto (+) ou Invertido (NOT)">
            ${polLabel}
          </button>
          <span class="sensor-token">${token}</span>
        `;

        if (idx === 1 && tokens.length > 2) {
          formulaHtml += '<span style="color:#6e7d8a; font-weight:bold; font-size:1.05rem;">)</span>';
        }

        if (idx < tokens.length - 1) {
          const slotVal = this.slots[idx] || '?';
          const isActiveSlot = idx === this.activeSlot ? 'is-active' : '';
          formulaHtml += `
            <button class="slot-btn ${isActiveSlot}" data-sidx="${idx}" title="Clique para selecionar este operador">
              ${this.getOpLabel(slotVal)}
            </button>
          `;
        }
      });
      formulaHtml += '</div>';

      const isCurrentSectorResolved = this.resolvedStages && (this.resolvedStages.has(stageIdx) || (sec.stage_id && this.resolvedStages.has(sec.stage_id)));
      const currentRep = (this.stageReports || []).find(r => r.stageIdx === stageIdx);
      const currentSaved = currentRep ? currentRep.isSaved : true;

      const situationReportHtml = sec.situation_report ? `
        <details class="situation-accordion" id="situation-details" ${this.isSituationOpen ? 'open' : ''}>
          <summary class="situation-summary">
            <span>${isCurrentSectorResolved ? (currentSaved ? '✅ Status: Pacificado' : '🏚️ Status: Colapso') : 'ℹ️ Relatório de Situação'}</span>
            <span class="situation-chevron">▾</span>
          </summary>
          <div class="situation-content">
            ${!isCurrentSectorResolved ? `
              <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:0.72rem; color:#ff8888; font-family:var(--font-mono); font-weight:bold;">
                <span>🚨 EMERGÊNCIA</span>
                <span>⏱️ Ouro: 10s | Colapso: 130s</span>
              </div>
            ` : ''}
            <div>${isCurrentSectorResolved ? (currentSaved ? 'Setor pacificado e estrutura assegurada com sucesso!' : 'Estrutura não salva a tempo (Colapso predial — 0 pts).') : sec.situation_report}</div>
            ${!isCurrentSectorResolved ? `<div style="margin-top:4px; font-size:0.70rem; color:#8c9ba5;">💡 100% nos primeiros 10s. Danos a cada 30s. Após 130s, nota zero.</div>` : ''}
          </div>
        </details>
      ` : '';

      // Atualizar o nome do setor no Topo do Centro de Comando
      const stageChar = String.fromCharCode(65 + stageIdx);
      const rawSectorName = sec.sector_name || 'SETOR ATIVO';
      const cleanSectorName = rawSectorName.replace(/^Ponto\s+[A-Za-z0-9]+:\s*/i, '').trim();
      const activeSectorHeaderEl = document.getElementById('active-sector-header-name');
      if (activeSectorHeaderEl) {
        activeSectorHeaderEl.textContent = `[${stageChar}] ${cleanSectorName}`;
      }

      this.consoleEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <span class="console-section-title" style="margin-bottom:0; font-size:0.78rem; border-bottom:none;">📡 RELATÓRIO DA INTELIGÊNCIA</span>
          <button id="btn-toggle-syntax" class="btn-secondary-tactical" style="padding:2px 6px; font-size:0.72rem;">
            ${this.isNatural ? '🔤 Natural' : '💻 Código'}
          </button>
        </div>
        ${situationReportHtml}
        ${sensorsSectionHtml}
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px; margin-bottom:3px;">
          <span class="console-section-title" style="margin-bottom:0; font-size:0.76rem; border-bottom:none;">📋 PROTOCOLO TÁTICO</span>
        </div>
        <div class="proto-tabs-grid">${tabsHtml}</div>
        ${protoGuideHtml}
        <div class="protocol-card" style="margin-top:4px;">
          <div class="formula-display">${formulaHtml}</div>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
            <span style="font-size:0.72rem; color:var(--text-muted); white-space:nowrap;">Operador [ ? ]:</span>
            <div class="operator-palette" style="flex:1;">
              <button class="op-btn" data-op="AND">${this.getOpLabel('AND')}</button>
              <button class="op-btn" data-op="OR">${this.getOpLabel('OR')}</button>
              <button class="op-btn" data-op="XOR">${this.getOpLabel('XOR')}</button>
            </div>
          </div>
        </div>
        <div style="display:flex; gap:6px; margin-top:auto; padding-top:6px;">
          <button id="btn-exec" class="btn-tactical" style="flex:1;" ${isCurrentSectorResolved ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
            ${isCurrentSectorResolved ? '✅ SETOR JÁ PACIFICADO' : '🚀 EXECUTAR PROTOCOLO'}
          </button>
          <button id="btn-hint" class="btn-secondary-tactical" style="color:#9bb0c2; font-size:0.78rem; padding:4px 8px;">💡 DICA</button>
        </div>
      `;

      // Eventos da Mesa
      const detailsEl = document.getElementById('situation-details');
      if (detailsEl) {
        detailsEl.ontoggle = () => {
          this.isSituationOpen = detailsEl.open;
        };
      }

      const guideDetailsEl = document.getElementById('proto-guide-details');
      if (guideDetailsEl) {
        guideDetailsEl.ontoggle = () => {
          this.isProtoGuideOpen = guideDetailsEl.open;
        };
      }

      document.getElementById('btn-toggle-syntax').onclick = () => {
        this.audio.playClick();
        this.isNatural = !this.isNatural;
        this.renderSector(sec, stageIdx, this.stages, this.resolvedStages, missionTitle, this.stageReports);
      };
      document.querySelectorAll('.proto-tab-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.selectedProtoIdx = parseInt(btn.getAttribute('data-idx'));
          this.polarities = [];
          this.slots = ['?', '?'];
          this.renderSector(sec, stageIdx, this.stages, this.resolvedStages, missionTitle, this.stageReports);
        };
      });
      document.querySelectorAll('.polarity-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          const pidx = parseInt(btn.getAttribute('data-pidx'));
          this.polarities[pidx] = !this.polarities[pidx];
          this.renderSector(sec, stageIdx, this.stages, this.resolvedStages, missionTitle, this.stageReports);
        };
      });
      document.querySelectorAll('.slot-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.activeSlot = parseInt(btn.getAttribute('data-sidx'));
          this.renderSector(sec, stageIdx, this.stages, this.resolvedStages, missionTitle, this.stageReports);
        };
      });
      document.querySelectorAll('.op-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.slots[this.activeSlot] = btn.getAttribute('data-op');
          this.activeSlot = (this.activeSlot + 1) % this.slots.length;
          this.renderSector(sec, stageIdx, this.stages, this.resolvedStages, missionTitle, this.stageReports);
        };
      });
      document.getElementById('btn-exec').onclick = () => {
        if (isCurrentSectorResolved) return;
        this.bus.emit('EXECUTE_PROTOCOL', {
          sector: sec,
          protocol: proto,
          tokens,
          polarities: this.polarities,
          connectors: this.slots,
          sensors: sec.sensors || {}
        });
      };
      document.getElementById('btn-hint').onclick = () => {
        this.audio.playHint();
        alert(`💡 DICA TÁTICA:\n${proto.hint || 'Verifique a compatibilidade do protocolo e a presença/ausência de gás ou civis.'}`);
      };
    }
  }

  // 8. TUTORIAL INTERATIVO / ONBOARDING DO COMANDANTE

class TutorialManager {
    constructor(audio, bus) {
      this.audio = audio;
      this.bus = bus;
      this.currentStep = 0;
      this.modal = document.getElementById('tutorial-modal');

      this.steps = [
        {
          title: "1. 🛰️ Radar Satélite & Deslocamento do Drone",
          text: "Bem-vindo ao Centro de Comando! Na tela principal, você acompanha a cidade por imagem de satélite em tempo real. O drone tático decola da <strong>BASE-01</strong> e navega pelos corredores de voo táticos.<br><br>• Você pode clicar em qualquer ponto do mapa para redirecionar o drone manualmente caso necessário."
        },
        {
          title: "2. 🌡️ Sensores FLIR & Risco Dinâmico",
          text: "No painel lateral direito, observe os sensores térmicos e atmosféricos:<br>• <code>CIVIS_DETECTADOS</code>, <code>FOGO_ATIVO</code>, <code>GAS_TOXICO</code>.<br><br>⚠️ <strong>Atenção ao Cronômetro:</strong> Conforme o tempo avança, a gravidade do risco aumenta (🟢 Seguro ➔ 🟡 Expandindo ➔ 🔴 Crítico / Colapso Iminente). Seja rápido para salvar o setor!"
        },
        {
          title: "3. 🧩 Escolha de Protocolo & Toggle [ + / NÃO ]",
          text: "Cada situação de emergência exige o protocolo correto (Alpha, Bravo, Charlie ou Delta).<br><br>• Clique no botão <strong>[ + / NÃO ]</strong> ao lado de cada sensor para inverter a polaridade quando necessário.<br>• Escolha os conectivos <strong>AND (E)</strong>, <strong>OR (OU)</strong> ou <strong>XOR</strong> nos slots <code>[ ? ]</code>."
        },
        {
          title: "4. 🚀 Validação, Surtidas Encadeadas & Pontuação",
          text: "Ao finalizar a regra, clique em <strong>🚀 EXECUTAR PROTOCOLO</strong>.<br><br>• Se a regra estiver correta, o drone neutraliza a ameaça e avança imediatamente para o próximo ponto da missão.<br>• Finalizar rapidamente concede até <strong>+45% de Bônus de Agilidade</strong> sobre a pontuação base!"
        }
      ];

      this.setupEvents();
    }

    setupEvents() {
      const btnNext = document.getElementById('tutorial-btn-next');
      const btnPrev = document.getElementById('tutorial-btn-prev');
      const btnSkip = document.getElementById('tutorial-btn-skip');

      if (btnNext) btnNext.onclick = () => this.next();
      if (btnPrev) btnPrev.onclick = () => this.prev();
      if (btnSkip) btnSkip.onclick = () => this.close();
    }

    start(onComplete = null) {
      this.onComplete = onComplete;
      this.currentStep = 0;
      this.showStep(0);
      if (this.modal) this.modal.style.display = 'flex';
      if (this.audio) this.audio.playPing();
    }

    showStep(idx) {
      this.currentStep = idx;
      const step = this.steps[idx];

      const counter = document.getElementById('tutorial-step-counter');
      const title = document.getElementById('tutorial-step-title');
      const content = document.getElementById('tutorial-step-content');
      const btnPrev = document.getElementById('tutorial-btn-prev');
      const btnNext = document.getElementById('tutorial-btn-next');

      if (counter) counter.textContent = `Passo ${idx + 1} de ${this.steps.length}`;
      if (title) title.innerHTML = step.title;
      if (content) content.innerHTML = step.text;

      if (btnPrev) btnPrev.style.visibility = idx > 0 ? 'visible' : 'hidden';
      if (btnNext) {
        btnNext.textContent = idx === this.steps.length - 1 ? '🎯 Iniciar Operação!' : 'Próximo ➡️';
      }
    }

    next() {
      if (this.audio) this.audio.playClick();
      if (this.currentStep < this.steps.length - 1) {
        this.showStep(this.currentStep + 1);
      } else {
        this.close();
        if (this.onComplete) this.onComplete();
      }
    }

    prev() {
      if (this.audio) this.audio.playClick();
      if (this.currentStep > 0) this.showStep(this.currentStep - 1);
    }

    close() {
      if (this.audio) this.audio.playClick();
      if (this.modal) this.modal.style.display = 'none';
      localStorage.setItem('nexo_tutorial_completed', 'true');
    }
  }

  // 9. MOTOR PRINCIPAL DA OPERAÇÃO NEXO

  // ORCHESTRATOR

/**
 * ============================================================================
 * Operação NEXO: Comando & Resgate — Orquestrador Modular Principal
 * ============================================================================
 * UFMT GameHub — Co-criado por Reinaldo Júnior & ⚡ L.O.G.O.S.
 * ============================================================================
 */


class OperacaoNexo {
    constructor() {
      this.bus = new EventBus();
      this.audio = new AudioSystem();
      this.drone = new DroneController(45, 45);
      
      this.gameState = 'MENU'; // MENU, GAMEPLAY, PAUSED, VICTORY, GAMEOVER
      this.currentMode = 'training'; // training, ranked
      this.score = 0;
      this.sectorElapsedTime = 0;
      this.streak = 0;
      this.stageReports = [];

      this.currentSeasonIdx = 0;
      this.currentWeekIdx = 0;
      this.currentStageIdx = 0;
      this.resolvedStages = new Set();
      this.currentMission = null;
      this.currentSector = null;
      this.hintsUsedInSector = 0;

      this.init();
    }

    getSectorIntegrity(t) {
      if (t <= 10) return 1.0;
      if (t <= 130) {
        const elapsedInSpan = t - 10;
        const factor = 1.0 - (elapsedInSpan / 120) * 0.80;
        return Math.max(0.20, factor);
      }
      return 0.0;
    }

    init() {
      this.canvas = document.getElementById('satellite-canvas');
      this.renderer = new MapRenderer(this.canvas);
      this.hud = new TacticalHUD(this.bus, this.audio);
      this.tutorial = new TutorialManager(this.audio, this.bus);

      this.resize();
      window.addEventListener('resize', () => this.resize());
      if (window.ResizeObserver && this.canvas.parentElement) {
        const ro = new ResizeObserver(() => this.resize());
        ro.observe(this.canvas.parentElement);
      }

      // Seleção de Setor via Bus (Barra do HUD ou Atalhos)
      this.bus.on('SELECT_STAGE', (idx) => {
        if (this.gameState === 'GAMEPLAY') {
          this.selectStage(idx);
        }
      });

      // Clique no canvas -> Seleciona Setor [A, B, C] ou Move Drone livremente
      this.canvas.addEventListener('pointerdown', (e) => {
        if (this.gameState !== 'GAMEPLAY') return;
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);

        const stages = (this.currentMission && this.currentMission.stages) ? this.currentMission.stages : [];
        const clickedStageIdx = this.renderer.getStageAtPosition(x, y, stages, this.canvas.width, this.canvas.height);

        if (clickedStageIdx !== -1) {
          this.audio.playClick();
          this.selectStage(clickedStageIdx);
        } else {
          this.drone.setDestination(x, y);
          this.audio.playClick();
        }
      });

      // Atalhos de Teclado (ESC ou P para Pausa — Bloqueado no Ranqueado)
      window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' || e.code === 'KeyP') {
          if (this.gameState === 'GAMEPLAY') {
            if (this.currentMode === 'ranked') {
              this.audio.playError();
              return;
            }
            this.pauseGame();
          } else if (this.gameState === 'PAUSED') {
            this.resumeGame();
          }
        }
      });

      this.setupDOM();
      this.showMainMenu();

      // Loop Contínuo
      let lastTime = performance.now();
      const loop = (now) => {
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        let threatRatio = 0;
        if (this.gameState === 'GAMEPLAY') {
          this.drone.update(dt);
          this.sectorElapsedTime += dt;
          
          const integrity = this.getSectorIntegrity(this.sectorElapsedTime);
          const integrityPercent = Math.round(integrity * 100);
          threatRatio = Math.min(1.5, this.sectorElapsedTime / 130);

          const timeEl = document.getElementById('hud-time-badge');
          if (timeEl) {
            const secElapsed = Math.floor(this.sectorElapsedTime);
            const min = Math.floor(secElapsed / 60);
            const sec = secElapsed % 60;
            const timeFormatted = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

            if (this.sectorElapsedTime <= 10) {
              timeEl.textContent = `⏱️ ${timeFormatted} | ESTRUTURA: 100% 🟢 ⭐⭐⭐`;
              timeEl.style.color = 'var(--military-green)';
            } else if (this.sectorElapsedTime <= 40) {
              timeEl.textContent = `⏱️ ${timeFormatted} | ESTRUTURA: ${integrityPercent}% 🟢 ⭐⭐⭐`;
              timeEl.style.color = 'var(--military-green)';
            } else if (this.sectorElapsedTime <= 70) {
              timeEl.textContent = `⏱️ ${timeFormatted} | ESTRUTURA: ${integrityPercent}% 🟡 ⭐⭐`;
              timeEl.style.color = 'var(--military-amber)';
            } else if (this.sectorElapsedTime <= 100) {
              timeEl.textContent = `⏱️ ${timeFormatted} | ESTRUTURA: ${integrityPercent}% 🟠 ⭐⭐`;
              timeEl.style.color = '#ff9933';
            } else if (this.sectorElapsedTime <= 130) {
              timeEl.textContent = `⏱️ ${timeFormatted} | RISCO COLAPSO: ${integrityPercent}% 🔴 ⭐`;
              timeEl.style.color = '#ff3333';
            } else {
              timeEl.textContent = `⏱️ ${timeFormatted} | 🏚️ ESTRUTURA NÃO SALVA (0% / 0 pts)`;
              timeEl.style.color = '#8c9ba5';
            }
          }
        }

        this.renderer.render(this.drone, this.currentSector, { x: this.drone.targetX, y: this.drone.targetY }, threatRatio, this.currentMission, this.currentStageIdx, this.resolvedStages, this.stageReports);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    resize() {
      const p = this.canvas.parentElement;
      const w = p ? p.clientWidth : 700;
      const h = p ? p.clientHeight : 520;
      this.renderer.resize(w || 700, h || 520);
    }

    setupDOM() {
      document.getElementById('menu-btn-ranked').onclick = () => this.handleRankedSelection();
      document.getElementById('menu-btn-training').onclick = () => this.startMission('training');
      
      const btnTutorial = document.getElementById('menu-btn-tutorial');
      if (btnTutorial) {
        btnTutorial.onclick = () => {
          this.tutorial.start(() => this.startMission('training'));
        };
      }

      const manualModal = document.getElementById('manual-modal');
      const a11yModal = document.getElementById('a11y-modal');

      document.getElementById('menu-btn-manual').onclick = () => { this.audio.playClick(); manualModal.style.display = 'flex'; };
      document.getElementById('menu-btn-a11y').onclick = () => { this.audio.playClick(); a11yModal.style.display = 'flex'; };

      document.getElementById('btn-open-manual').onclick = () => { this.audio.playClick(); manualModal.style.display = 'flex'; };
      document.getElementById('btn-close-manual').onclick = () => { manualModal.style.display = 'none'; };

      document.getElementById('btn-open-a11y').onclick = () => { this.audio.playClick(); a11yModal.style.display = 'flex'; };
      document.getElementById('btn-close-a11y').onclick = () => { a11yModal.style.display = 'none'; };

      document.getElementById('btn-pause-game').onclick = () => this.pauseGame();
      document.getElementById('btn-return-menu').onclick = () => this.showMainMenu();

      document.getElementById('pause-btn-resume').onclick = () => this.resumeGame();
      document.getElementById('pause-btn-restart').onclick = () => {
        this.resumeGame();
        this.loadStage(this.currentStageIdx);
      };
      document.getElementById('pause-btn-menu').onclick = () => this.showMainMenu();

      document.getElementById('victory-btn-next').onclick = () => {
        document.getElementById('victory-overlay').style.display = 'none';
        this.gameState = 'GAMEPLAY';
        this.loadNextWeek();
      };
      document.getElementById('victory-btn-menu').onclick = () => this.showMainMenu();

      document.getElementById('defeat-btn-retry').onclick = () => {
        document.getElementById('defeat-overlay').style.display = 'none';
        this.gameState = 'GAMEPLAY';
        this.loadStage(this.currentStageIdx);
      };
      document.getElementById('defeat-btn-manual').onclick = () => {
        document.getElementById('defeat-overlay').style.display = 'none';
        manualModal.style.display = 'flex';
      };
      document.getElementById('defeat-btn-menu').onclick = () => this.showMainMenu();

      // EXECUÇÃO BOOLEANA COM VALIDAÇÃO MATEMÁTICA & DECISÃO DE PROTOCOLO
      this.bus.on('EXECUTE_PROTOCOL', ({ sector, protocol, tokens, polarities, connectors, sensors }) => {
        // 1. Validação de Escolha de Protocolo
        if (!protocol.is_correct_protocol) {
          const reason = protocol.tactical_reject_reason || 'Protocolo tático incorreto para este tipo de incidente.';
          this.handleDefeat(sector, protocol, reason);
          return;
        }

        // 2. Validação de Conectivos Preenchidos
        const hasUnfilled = connectors.some(c => c === '?');
        if (hasUnfilled) {
          this.audio.playError();
          alert('⚠️ LACUNAS NÃO PREENCHIDAS!\nSelecione operadores booleanos (E, OU, XOR) para todas as lacunas [ ? ] antes de executar.');
          return;
        }

        // 3. Avaliador Booleano Matemático Real
        const termValues = tokens.map((token, idx) => {
          const rawVal = !!sensors[token];
          const isNot = !!polarities[idx];
          return isNot ? !rawVal : rawVal;
        });

        const applyOp = (a, op, b) => {
          if (op === 'AND') return a && b;
          if (op === 'OR') return a || b;
          if (op === 'XOR') return (a || b) && !(a && b);
          return false;
        };

        let result = termValues[0];
        if (termValues.length >= 2) result = applyOp(termValues[0], connectors[0], termValues[1]);
        if (termValues.length >= 3) result = applyOp(result, connectors[1], termValues[2]);
        if (termValues.length >= 4) result = applyOp(result, connectors[2], termValues[3]);

        if (result === true) {
          this.handleStageSuccess(sector, protocol);
        } else {
          const failMsg = `Falha de validação lógica no ${protocol.title}: A regra montada resultou em FALSO para os sensores atuais. Ajuste os botões [ + / NÃO ] ou os conectivos [ ? ].`;
          this.handleDefeat(sector, protocol, failMsg);
        }
      });

      // Acessibilidade
      document.getElementById('select-colorblind').onchange = (e) => {
        const m = e.target.value;
        document.body.classList.remove('theme-protanopia', 'theme-deuteranopia', 'theme-tritanopia', 'theme-high-contrast');
        if (m !== 'none') document.body.classList.add(`theme-${m}`);
      };

      document.getElementById('check-reduced-motion').onchange = (e) => {
        if (e.target.checked) document.body.classList.add('reduced-motion');
        else document.body.classList.remove('reduced-motion');
      };
    }

    showMainMenu() {
      this.gameState = 'MENU';
      document.getElementById('main-menu-overlay').style.display = 'flex';
      document.getElementById('pause-overlay').style.display = 'none';
      document.getElementById('victory-overlay').style.display = 'none';
      document.getElementById('defeat-overlay').style.display = 'none';

      const btnPause = document.getElementById('btn-pause-game');
      if (btnPause) {
        btnPause.disabled = false;
        btnPause.style.opacity = '1';
        btnPause.style.cursor = 'pointer';
        btnPause.title = 'Pausar Operação (ESC)';
        btnPause.textContent = '⏸️ Pausar';
      }

      const today = new Date().toISOString().split('T')[0];
      const lastPlayedDate = localStorage.getItem('nexo_ranked_date');
      const rankedBadge = document.getElementById('ranked-lock-badge');

      if (lastPlayedDate === today) {
        rankedBadge.textContent = '🔒 CONCLUÍDO HOJE';
        rankedBadge.style.color = '#ff9999';
      } else {
        rankedBadge.textContent = '⚔️ DISPONÍVEL HOJE';
        rankedBadge.style.color = 'var(--military-amber)';
      }
    }

    handleRankedSelection() {
      const today = new Date().toISOString().split('T')[0];
      const lastPlayedDate = localStorage.getItem('nexo_ranked_date');

      if (lastPlayedDate === today) {
        this.audio.playError();
        alert('🔒 DESAFIO DIÁRIO JÁ REALIZADO!\nVocê já concluiu o desafio oficial de hoje. O próximo será liberado amanhã às 00:00.\n\nUse a Central de Treinamento para continuar praticando livremente!');
        return;
      }

      this.startMission('ranked');
    }

    startMission(mode) {
      this.currentMode = mode;
      this.score = 0;
      this.streak = 0;
      this.sectorElapsedTime = 0;
      this.stageReports = [];
      this.currentSeasonIdx = 0;
      this.currentWeekIdx = 0;
      this.currentStageIdx = 0;
      this.resolvedStages = new Set();
      this.gameState = 'GAMEPLAY';

      document.getElementById('main-menu-overlay').style.display = 'none';
      document.getElementById('pause-overlay').style.display = 'none';

      const modeLabel = document.getElementById('mode-badge-label');
      const modeNotice = document.getElementById('mode-rule-notice');
      const scoreBadge = document.getElementById('hud-score-badge');
      const streakBadge = document.getElementById('hud-streak-badge');
      const btnPause = document.getElementById('btn-pause-game');

      if (streakBadge) streakBadge.textContent = '🔥 OFENSIVA: 0';

      if (mode === 'ranked') {
        modeLabel.className = 'mode-badge-ranked';
        modeLabel.textContent = 'MODO: DESAFIO DIÁRIO (RANQUEADO OFICIAL)';
        modeNotice.textContent = 'Pontuação oficial gravada (Pausa desativada por integridade)';
        scoreBadge.textContent = 'SCORE OFICIAL: 0';
        scoreBadge.style.color = 'var(--military-amber)';

        if (btnPause) {
          btnPause.disabled = true;
          btnPause.style.opacity = '0.35';
          btnPause.style.cursor = 'not-allowed';
          btnPause.title = 'Pausa bloqueada no Modo Ranqueado (Integridade Antifraude)';
          btnPause.textContent = '🔒 Pausa Bloqueada';
        }
      } else {
        modeLabel.className = 'mode-badge-training';
        modeLabel.textContent = 'MODO: CENTRAL DE TREINAMENTO (LIVRE)';
        modeNotice.textContent = 'Score isolado de estudo (não altera ranking)';
        scoreBadge.textContent = 'SCORE TREINO: 0';
        scoreBadge.style.color = 'var(--military-green)';

        if (btnPause) {
          btnPause.disabled = false;
          btnPause.style.opacity = '1';
          btnPause.style.cursor = 'pointer';
          btnPause.title = 'Pausar Operação (ESC)';
          btnPause.textContent = '⏸️ Pausar';
        }
      }

      this.loadSeasonWeek(this.currentSeasonIdx, this.currentWeekIdx);
    }

    pauseGame() {
      if (this.gameState !== 'GAMEPLAY') return;
      if (this.currentMode === 'ranked') {
        this.audio.playError();
        return;
      }
      this.gameState = 'PAUSED';
      this.audio.playClick();
      document.getElementById('pause-overlay').style.display = 'flex';
    }

    resumeGame() {
      this.gameState = 'GAMEPLAY';
      this.audio.playClick();
      document.getElementById('pause-overlay').style.display = 'none';
    }

    loadSeasonWeek(seasonIdx, weekIdx) {
      const seasons = (window.LEVELS_DATA || {}).temporadas || [];
      const season = seasons[seasonIdx] || seasons[0];
      const weeks = season.weeks || [];

      if (weekIdx >= weeks.length) {
        this.finishOperation();
        return;
      }

      this.currentMission = JSON.parse(JSON.stringify(weeks[weekIdx]));
      this.currentMission.mission_title = `${season.region_name} • ${this.currentMission.week_title}`;
      this.currentStageIdx = 0;
      this.resolvedStages = new Set();
      this.stageReports = [];
      this.sectorElapsedTime = 0;

      // Carrega textura do mapa se houver
      if (this.renderer && this.currentMission.map_image) {
        this.renderer.loadMap(this.currentMission.map_image);
      }

      this.selectStage(0);
    }

    loadNextWeek() {
      const seasons = (window.LEVELS_DATA || {}).temporadas || [];
      const season = seasons[this.currentSeasonIdx] || seasons[0];
      const weeks = season.weeks || [];

      if (this.currentWeekIdx + 1 < weeks.length) {
        this.currentWeekIdx++;
        this.loadSeasonWeek(this.currentSeasonIdx, this.currentWeekIdx);
      } else if (this.currentSeasonIdx + 1 < seasons.length && seasons[this.currentSeasonIdx + 1].weeks.length > 0) {
        this.currentSeasonIdx++;
        this.currentWeekIdx = 0;
        this.loadSeasonWeek(this.currentSeasonIdx, this.currentWeekIdx);
      } else {
        this.finishOperation();
      }
    }

    selectStage(idx) {
      const stages = this.currentMission ? (this.currentMission.stages || []) : [];
      if (idx < 0 || idx >= stages.length) return;

      this.currentStageIdx = idx;
      const st = stages[idx];
      this.currentSector = st;
      this.hintsUsedInSector = 0;

      // Se for setor novo/não resolvido, reinicia o cronômetro do setor
      const isResolved = this.resolvedStages && (this.resolvedStages.has(idx) || (st.stage_id && this.resolvedStages.has(st.stage_id)));
      if (!isResolved) {
        this.sectorElapsedTime = 0;
      }

      if (st) {
        const targetPos = this.renderer.getSectorScreenPosition(st, stages, this.canvas.width || 700, this.canvas.height || 520);
        this.drone.setDestination(targetPos.x, targetPos.y);
      }

      this.hud.selectedProtoIdx = 0;
      this.hud.polarities = [];
      this.hud.slots = ['?', '?'];
      this.hud.renderSector(st, idx, stages, this.resolvedStages, this.currentMission.mission_title, this.stageReports);
    }

    loadStage(idx) {
      this.selectStage(idx);
    }

    handleStageSuccess(stage, protocol) {
      this.audio.playSuccess();

      this.resolvedStages.add(this.currentStageIdx);
      if (stage && stage.stage_id) {
        this.resolvedStages.add(stage.stage_id);
      }

      const integrity = this.getSectorIntegrity(this.sectorElapsedTime);
      const integrityPercent = Math.round(integrity * 100);
      const isSaved = integrity > 0;
      const basePoints = stage.base_score || 1000;
      const modeMult = this.currentMode === 'ranked' ? 1.5 : 1.0;

      let gained = 0;
      if (isSaved) {
        if (this.sectorElapsedTime <= 10) {
          gained = Math.floor(basePoints * 1.5 * modeMult);
        } else {
          gained = Math.floor(basePoints * (integrity * 1.25) * modeMult);
        }
        this.streak++;
      } else {
        gained = 0; // Nota zero por colapso estrutural (tempo excedeu 130s)
        this.streak = 0;
      }

      this.score += gained;

      this.stageReports.push({
        stageIdx: this.currentStageIdx,
        stageName: stage.sector_name || `Ponto ${String.fromCharCode(65 + this.currentStageIdx)}`,
        timeSpent: this.sectorElapsedTime,
        integrityPercent,
        isSaved,
        gained
      });

      const scoreBadge = document.getElementById('hud-score-badge');
      if (scoreBadge) {
        scoreBadge.textContent = this.currentMode === 'ranked' ? `SCORE OFICIAL: ${this.score}` : `SCORE TREINO: ${this.score}`;
      }
      const streakBadge = document.getElementById('hud-streak-badge');
      if (streakBadge) streakBadge.textContent = `🔥 OFENSIVA: ${this.streak}`;

      const stages = this.currentMission ? (this.currentMission.stages || []) : [];
      
      // Verifica se todos os setores da semana foram pacificados
      const allResolved = stages.length > 0 && stages.every((st, i) => this.resolvedStages.has(i) || (st.stage_id && this.resolvedStages.has(st.stage_id)));

      if (allResolved) {
        this.handleVictory(this.currentMission, protocol);
      } else {
        // Renderiza o setor atual como pacificado
        this.hud.renderSector(stage, this.currentStageIdx, stages, this.resolvedStages, this.currentMission.mission_title, this.stageReports);

        // Seleciona automaticamente o próximo setor pendente
        const nextPendingIdx = stages.findIndex((st, i) => !this.resolvedStages.has(i) && (!st.stage_id || !this.resolvedStages.has(st.stage_id)));
        if (nextPendingIdx !== -1) {
          setTimeout(() => {
            if (this.gameState === 'GAMEPLAY') {
              this.selectStage(nextPendingIdx);
            }
          }, 600);
        }
      }
    }

    handleVictory(mission, protocol) {
      this.gameState = 'VICTORY';
      this.audio.playSuccess();

      const stages = mission.stages || [];
      const numStages = stages.length || 1;
      const maxPossibleScore = Math.floor(numStages * 1500 * (this.currentMode === 'ranked' ? 1.5 : 1.0));
      const efficiency = maxPossibleScore > 0 ? (this.score / maxPossibleScore) : 0;
      
      let stars = 0;
      if (efficiency >= 0.80) stars = 3;
      else if (efficiency >= 0.50) stars = 2;
      else if (efficiency >= 0.20) stars = 1;
      else stars = 0;

      const savedCount = this.stageReports.filter(r => r.isSaved).length;

      document.getElementById('victory-stars').textContent = stars > 0 ? ('⭐'.repeat(stars) + '☆'.repeat(3 - stars)) : '☆☆☆ (Estruturas Não Salvas)';
      document.getElementById('victory-score-report').innerHTML = `Pontuação Total da Surtida: <strong style="color:var(--military-green);">${this.score} / ${maxPossibleScore} pts</strong> (${Math.round(efficiency * 100)}% Eficiência | ${savedCount}/${numStages} Salvos)`;

      // Boletim Detalhado por Prédio
      let reportHtml = `<div style="text-align:left; background:#11151a; border:1px solid #232d36; border-radius:4px; padding:8px 10px; margin-top:8px; font-size:0.75rem; font-family:var(--font-mono);">`;
      reportHtml += `<div style="color:var(--military-amber); font-weight:bold; margin-bottom:6px; border-bottom:1px solid #232d36; padding-bottom:3px;">📋 BOLETIM DE RESGATE POR EDIFÍCIO:</div>`;
      
      this.stageReports.forEach((rep) => {
        const min = Math.floor(rep.timeSpent / 60);
        const sec = Math.floor(rep.timeSpent % 60);
        const timeStr = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        const icon = rep.isSaved ? (rep.integrityPercent >= 100 ? '🏆' : (rep.integrityPercent >= 60 ? '🟢' : '🟡')) : '🏚️';
        const statusText = rep.isSaved ? `${rep.integrityPercent}% Integridade` : `<span style="color:#ff6666;">Colapso / Não Salvo</span>`;
        
        reportHtml += `<div style="display:flex; justify-content:space-between; margin-bottom:4px; border-bottom:1px dashed #1a222a; padding-bottom:2px;">
          <span>${icon} <strong>${rep.stageName}</strong> (⏱️ ${timeStr})</span>
          <span>${statusText} ➔ <strong style="color:${rep.gained > 0 ? '#4ec95c' : '#888'};">+${rep.gained} pts</strong></span>
        </div>`;
      });
      
      reportHtml += `</div>`;

      document.getElementById('victory-details-report').innerHTML = `
        <div>${mission.mission_title || mission.week_title || 'Missão'} concluída! ${savedCount === numStages ? 'Todos os setores assegurados com honras militares!' : `${savedCount} de ${numStages} estruturas salvas a tempo.`}</div>
        ${reportHtml}
      `;

      document.getElementById('victory-overlay').style.display = 'flex';
    }

    handleDefeat(sector, protocol, customReason = null) {
      this.gameState = 'GAMEOVER';
      this.audio.playError();
      this.streak = 0;

      const streakBadge = document.getElementById('hud-streak-badge');
      if (streakBadge) streakBadge.textContent = '🔥 OFENSIVA: 0';

      const reason = customReason || `Falha de validação no ${protocol ? protocol.title : 'Protocolo'}: operadores violaram os parâmetros de segurança dos sensores.`;
      document.getElementById('defeat-reason').textContent = reason;
      document.getElementById('defeat-overlay').style.display = 'flex';
    }

    handleTimeout() {
      this.gameState = 'GAMEOVER';
      this.audio.playError();
      this.streak = 0;

      const streakBadge = document.getElementById('hud-streak-badge');
      if (streakBadge) streakBadge.textContent = '🔥 OFENSIVA: 0';

      document.getElementById('defeat-reason').textContent = `TEMPO OPERACIONAL ESGOTADO! O setor entrou em colapso antes do envio do protocolo.`;
      document.getElementById('defeat-overlay').style.display = 'flex';
    }

    finishOperation() {
      if (this.currentMode === 'ranked') {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('nexo_ranked_date', today);
        localStorage.setItem('nexo_official_score', this.score);
      }

      alert(`🏆 OPERAÇÃO REGIONAL CONCLUÍDA!\nVocê finalizou todas as semanas ativas da temporada com honras militares!\nPontuação Final: ${this.score} PONTOS.`);
      this.showMainMenu();
    }
  }

  // INICIALIZAÇÃO
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
      window.nexoApp = new OperacaoNexo();
      window.nexoGame = window.nexoApp;
    });
  }
})();

