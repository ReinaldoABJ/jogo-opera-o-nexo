/**
 * ============================================================================
 * OPERAÇÃO NEXO: COMANDO & RESGATE — Bundle Standalone Executável
 * ============================================================================
 * UFMT GameHub — Co-criado por Reinaldo Júnior & ⚡ L.O.G.O.S.
 * Execução 100% nativa sem dependências externas (Compatível com file:///)
 * ============================================================================
 */

(function() {
  'use strict';

  // 1. DICIONÁRIO DE INTERNACIONALIZAÇÃO (i18n)
  const I18N = {
    'pt-br': {
      game_title: "Operação NEXO: Comando & Resgate",
      game_subtitle: "Centro de Comando Tático — Defesa Civil & Resgate",
      mode_ranked: "Desafio Diário (Ranqueado)",
      mode_training: "Central de Treinamento",
      manual_title: "📖 Manual Lógico do Comandante (Tabela-Verdade)",
      manual_and: "Ambas as condições devem ser verdadeiras para autorizar o protocolo.",
      manual_or: "Basta uma das condições ser verdadeira para autorizar o protocolo.",
      manual_not: "Inverte a polaridade do sensor. NOT(GÁS) é VERDADEIRO quando NÃO há gás no local.",
      manual_xor: "Apenas UMA das condições pode ser verdadeira, nunca ambas ao mesmo tempo.",
      victory_title: "SETOR PACIFICADO COM SUCESSO!",
      gameover_title: "FALHA OPERACIONAL!"
    },
    'en': {
      game_title: "Operation NEXO: Command & Rescue",
      game_subtitle: "Tactical Command Center — Civil Defense & Rescue",
      mode_ranked: "Daily Challenge (Ranked)",
      mode_training: "Training Operations",
      manual_title: "📖 Commander's Logic Manual (Truth Table)",
      manual_and: "Both conditions must be true to authorize protocol execution.",
      manual_or: "At least one condition must be true to authorize action.",
      manual_not: "Inverts sensor state. NOT(GAS) is TRUE when there is NO gas present.",
      manual_xor: "Only ONE condition must be true, never both simultaneously.",
      victory_title: "SECTOR SECURED SUCCESSFULLY!",
      gameover_title: "TACTICAL MISSION FAILURE!"
    }
  };

  // 2. DATASET DE TEMPORADAS (6 MESES / 24 SEMANAS)
  const LEVELS_DATA = {
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

  // 3. EVENT BUS
  class EventBus {
    constructor() { this.events = {}; }
    on(name, cb) { if (!this.events[name]) this.events[name] = []; this.events[name].push(cb); }
    emit(name, data) { if (this.events[name]) this.events[name].forEach(cb => cb(data)); }
  }

  // 4. ÁUDIO SINTETIZADO NATIVO
  class AudioSystem {
    constructor() { this.ctx = null; this.vol = 0.35; }
    init() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }
    playTone(freq, type = 'sine', dur = 0.1, delay = 0) {
      this.init();
      if (!this.ctx) return;
      try {
        const t = this.ctx.currentTime + delay;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = type;
        o.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(this.vol, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(this.ctx.destination);
        o.start(t); o.stop(t + dur);
      } catch (e) {}
    }
    playClick() { this.playTone(800, 'triangle', 0.04); }
    playPing() { this.playTone(1200, 'sine', 0.1); }
    playSuccess() {
      this.playTone(440, 'triangle', 0.08, 0);
      this.playTone(554.37, 'triangle', 0.08, 0.08);
      this.playTone(659.25, 'triangle', 0.2, 0.16);
    }
    playError() { this.playTone(180, 'sawtooth', 0.25); }
    playHint() { this.playTone(950, 'sine', 0.15); }
    playDrone() { this.playTone(120, 'sine', 0.06); }
  }

  // 5. MAP RENDERER (SATÉLITE REALISTA COM COVER & PROCEDURAL FALLBACK)
  class MapRenderer {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.rotorAngle = 0;
      this.smoke = [];
      for (let i = 0; i < 20; i++) {
        this.smoke.push({ x: 180 + (Math.random() * 30 - 15), y: 140 + (Math.random() * 30 - 15), r: Math.random() * 8 + 4, a: Math.random() * 0.5 + 0.2, sp: Math.random() * 0.4 + 0.2 });
      }

      this.currentMapSrc = '';
      this.mapLoaded = false;
      this.droneLoaded = false;

      this.loadMap('./assets/sprites/map_satellite.png');

      this.droneImg = new Image();
      this.droneImg.onload = () => { this.droneLoaded = true; };
      this.droneImg.src = './assets/sprites/drone.png';
    }

    loadMap(imageSrc) {
      const src = imageSrc || './assets/sprites/map_satellite.png';
      if (this.currentMapSrc === src && this.mapLoaded) return;
      this.currentMapSrc = src;
      this.mapLoaded = false;
      this.mapImg = new Image();
      this.mapImg.onload = () => { this.mapLoaded = true; };
      this.mapImg.onerror = () => { this.mapLoaded = false; }; // Fallback procedural automático
      this.mapImg.src = src;
    }

    resize(w, h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }

    render(drone, sector, waypoint, threatRatio = 0, currentMission = null, activeStageIdx = 0) {
      const ctx = this.ctx;
      const w = this.canvas.width || 700;
      const h = this.canvas.height || 520;

      // 1. Renderização da Imagem de Satélite com Aspect-Ratio Preservado (Cover Inteligente)
      if (this.mapLoaded && this.mapImg.naturalWidth > 0) {
        const imgW = this.mapImg.naturalWidth;
        const imgH = this.mapImg.naturalHeight;
        const scale = Math.max(w / imgW, h / imgH);
        const renderW = imgW * scale;
        const renderH = imgH * scale;
        const offsetX = (w - renderW) / 2;
        const offsetY = (h - renderH) / 2;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(this.mapImg, offsetX, offsetY, renderW, renderH);

        // Filtro tático
        ctx.fillStyle = 'rgba(17, 20, 23, 0.35)';
        ctx.fillRect(0, 0, w, h);
      } else {
        // Fallback Procedural de Alta Fidelidade (Quarteirões e Prédios)
        ctx.fillStyle = '#1c2226';
        ctx.fillRect(0, 0, w, h);

        const bldgs = [
          { x: 40, y: 40, w: 100, h: 80, c: '#2b353e' },
          { x: 180, y: 50, w: 120, h: 90, c: '#33404b' },
          { x: 340, y: 40, w: 90, h: 110, c: '#2b353e' },
          { x: 470, y: 60, w: 140, h: 80, c: '#35434e' },
          { x: 50, y: 180, w: 90, h: 120, c: '#313e48' },
          { x: 230, y: 220, w: 140, h: 100, c: '#2d3842' },
          { x: 410, y: 200, w: 110, h: 130, c: '#384855' },
          { x: 60, y: 350, w: 150, h: 90, c: '#2a343d' },
          { x: 260, y: 370, w: 110, h: 80, c: '#33414c' },
          { x: 420, y: 380, w: 160, h: 80, c: '#2e3a44' }
        ];
        bldgs.forEach(b => {
          ctx.fillStyle = b.c;
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.strokeStyle = '#273038';
          ctx.strokeRect(b.x, b.y, b.w, b.h);
          ctx.fillStyle = '#181f25';
          ctx.fillRect(b.x + 10, b.y + 10, 16, 16);
        });

        ctx.strokeStyle = '#4a5c4c'; ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, 50, 50);
        ctx.fillStyle = '#4ec95c'; ctx.font = '10px monospace';
        ctx.fillText('BASE-01', 24, 48);
      }

      // 2. Corredor Tático de Voo da Missão Multissetorial
      if (currentMission && currentMission.stages) {
        this.drawFlightCorridor(ctx, currentMission, activeStageIdx);
      }

      // 3. Fumaça & Gás Tóxico em Expansão Dinâmica por Nível de Risco
      if (sector && sector.coordinates) {
        const sx = sector.coordinates.x;
        const sy = sector.coordinates.y;
        const spreadFactor = 1 + threatRatio * 1.5;
        const isGas = sector.sensors && sector.sensors.GAS_TOXICO;
        const isFire = sector.sensors && sector.sensors.FOGO_ATIVO !== false;

        this.smoke.forEach(p => {
          p.y -= p.sp * (1 + threatRatio * 0.8);
          if (p.y < sy - 50 * spreadFactor) {
            p.y = sy + (Math.random() * 24 - 12);
            p.x = sx + (Math.random() * 40 - 20) * spreadFactor;
          }

          if (isFire) {
            ctx.fillStyle = `rgba(${180 + Math.floor(threatRatio * 75)}, ${60 - Math.floor(threatRatio * 30)}, 30, ${p.a * (0.35 + threatRatio * 0.4)})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 + threatRatio * 0.6), 0, Math.PI * 2); ctx.fill();
          }

          if (isGas) {
            ctx.fillStyle = `rgba(110, 180, 50, ${p.a * (0.3 + threatRatio * 0.35)})`;
            ctx.beginPath(); ctx.arc(p.x - 8, p.y + 4, p.r * (1.1 + threatRatio * 0.5), 0, Math.PI * 2); ctx.fill();
          }

          // Fumaça densa
          ctx.fillStyle = `rgba(40, 45, 50, ${p.a * (0.5 + threatRatio * 0.3)})`;
          ctx.beginPath(); ctx.arc(p.x + 4, p.y - 6, p.r * 1.3 * (1 + threatRatio * 0.4), 0, Math.PI * 2); ctx.fill();
        });

        // Marcador e Raio de Emergência Pulsante com Expansão Térmica
        const baseRadius = 28;
        const expandRadius = baseRadius + threatRatio * 32;
        const pulse = Math.sin(Date.now() / 180) * (2 + threatRatio * 4);

        let perimeterColor = '#4ec95c';
        let label = 'EMERGÊNCIA (CONTROLADA)';
        if (threatRatio > 0.7) {
          perimeterColor = '#ff3333';
          label = '🚨 COLAPSO IMINENTE!';
        } else if (threatRatio > 0.35) {
          perimeterColor = '#e5a00d';
          label = '⚠️ RISCO ELEVADO';
        }

        ctx.strokeStyle = perimeterColor;
        ctx.lineWidth = threatRatio > 0.7 ? 3 : 2;
        ctx.beginPath();
        ctx.arc(sx, sy, expandRadius + pulse, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = threatRatio > 0.7 ? 'rgba(255, 51, 51, 0.22)' : 'rgba(224, 75, 71, 0.15)';
        ctx.beginPath();
        ctx.arc(sx, sy, expandRadius + pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = perimeterColor;
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(label, sx - 48, sy - expandRadius - 8);
      }

      // 4. Waypoint
      if (waypoint && waypoint.x !== undefined) {
        ctx.strokeStyle = '#e5a00d'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.arc(waypoint.x, waypoint.y, 12, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(waypoint.x - 16, waypoint.y); ctx.lineTo(waypoint.x + 16, waypoint.y);
        ctx.moveTo(waypoint.x, waypoint.y - 16); ctx.lineTo(waypoint.x, waypoint.y + 16); ctx.stroke();
        ctx.setLineDash([]);
      }

      // 5. Drone
      if (drone) {
        ctx.save();
        ctx.translate(drone.x, drone.y);
        ctx.rotate(drone.angle);

        ctx.strokeStyle = 'rgba(78, 201, 92, 0.4)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(0, 0, 44, 0, Math.PI * 2); ctx.stroke();

        if (this.droneLoaded && this.droneImg.naturalWidth > 0) {
          const dW = this.droneImg.naturalWidth;
          const dH = this.droneImg.naturalHeight;
          const maxDim = 56;
          const dRatio = dW / dH;
          let drawW = maxDim;
          let drawH = maxDim;
          if (dRatio > 1) {
            drawH = maxDim / dRatio;
          } else {
            drawW = maxDim * dRatio;
          }
          ctx.drawImage(this.droneImg, -drawW / 2, -drawH / 2, drawW, drawH);
        } else {
          // Drone vetorial
          this.rotorAngle += 0.4;
          const rots = [{x:-16,y:-16},{x:16,y:-16},{x:-16,y:16},{x:16,y:16}];
          rots.forEach(pos => {
            ctx.save(); ctx.translate(pos.x, pos.y); ctx.rotate(this.rotorAngle);
            ctx.fillStyle = 'rgba(140, 160, 180, 0.7)'; ctx.fillRect(-10, -1.5, 20, 3);
            ctx.restore();
          });

          ctx.fillStyle = '#3b4a3c';
          ctx.beginPath(); ctx.roundRect(-10, -12, 20, 24, 4); ctx.fill();
          ctx.strokeStyle = '#273038'; ctx.stroke();

          ctx.fillStyle = '#e5a00d'; ctx.beginPath(); ctx.arc(0, -10, 3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#4ec95c'; ctx.fillRect(-8, 8, 2, 2);
          ctx.fillStyle = '#e04b47'; ctx.fillRect(6, 8, 2, 2);
        }

        ctx.restore();
      }

      // 6. Grid Militar
      ctx.strokeStyle = 'rgba(56, 69, 80, 0.2)'; ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    }

    drawFlightCorridor(ctx, mission, activeStageIdx) {
      if (!mission || !mission.stages || mission.stages.length <= 1) return;
      const stages = mission.stages;

      ctx.save();
      ctx.strokeStyle = 'rgba(229, 160, 13, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);

      ctx.beginPath();
      ctx.moveTo(45, 45); // Base-01
      stages.forEach(st => {
        if (st.coordinates) ctx.lineTo(st.coordinates.x, st.coordinates.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Marcadores dos Pontos Encadeados da Missão
      stages.forEach((st, idx) => {
        if (!st.coordinates) return;
        const { x, y } = st.coordinates;
        const isDone = idx < activeStageIdx;
        const isActive = idx === activeStageIdx;

        if (isDone) {
          ctx.fillStyle = '#4ec95c';
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#111417';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText('✓', x - 4, y + 4);
        } else if (!isActive) {
          ctx.strokeStyle = '#556877';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#8fa3b0';
          ctx.font = 'bold 9px monospace';
          ctx.fillText(`P${idx + 1}`, x - 6, y + 3);
        }
      });
    }
  }

  // 6. FÍSICA DO DRONE
  class DroneController {
    constructor(x = 45, y = 45) {
      this.x = x; this.y = y; this.vx = 0; this.vy = 0; this.angle = 0;
      this.targetX = null; this.targetY = null;
    }
    setDestination(x, y) { this.targetX = x; this.targetY = y; }
    update(dt) {
      if (this.targetX === null || this.targetY === null) return;
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 5) { this.x = this.targetX; this.y = this.targetY; this.vx = 0; this.vy = 0; return; }
      const targetAngle = Math.atan2(dy, dx) + Math.PI / 2;
      this.angle += (targetAngle - this.angle) * 0.15;
      const dirX = dx / dist; const dirY = dy / dist;
      const factor = Math.min(1.0, dist / 40);
      this.vx += dirX * 240 * dt * factor;
      this.vy += dirY * 240 * dt * factor;
      this.vx *= 0.92; this.vy *= 0.92;
      this.x += this.vx * dt * 160;
      this.y += this.vy * dt * 160;
    }
  }

  // 7. HUD TÁTICO & CONSTRUTOR BOOLEANO COM TOGGLES [ + / NOT ]
  class TacticalHUD {
    constructor(bus, audio) {
      this.bus = bus;
      this.audio = audio;
      this.isNatural = true;
      this.selectedProtoIdx = 0;
      this.polarities = []; // true = NOT, false = DIRETO
      this.slots = ['?', '?']; // Conectivos
      this.activeSlot = 0;
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

    renderSector(sec, stageIdx = 0, totalStages = 1, missionTitle = '') {
      this.currentSector = sec;
      this.currentStageIdx = stageIdx;
      this.totalStages = totalStages;
      this.missionTitle = missionTitle;

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

      // 1. Sensores FLIR
      let sensorsHtml = '';
      for (const [k, v] of Object.entries(sec.sensors || {})) {
        sensorsHtml += `
          <div class="sensor-box ${v ? 'val-true' : 'val-false'}">
            <span>${k}</span><strong>${v ? '🟢 TRUE' : '⚪ FALSE'}</strong>
          </div>`;
      }

      // 2. Abas de Protocolo
      let tabsHtml = '';
      protocols.forEach((p, idx) => {
        const active = idx === this.selectedProtoIdx 
          ? 'border-color:var(--military-amber); color:var(--military-amber); background:rgba(229,160,13,0.12);' 
          : '';
        tabsHtml += `<button class="btn-secondary-tactical proto-tab-btn" data-idx="${idx}" style="${active}">${p.title}</button>`;
      });

      // 3. Fórmula com Polarity Toggles [ + / NOT ] e Conectivos [ ? ]
      let formulaHtml = '<div style="display:flex; flex-wrap:wrap; align-items:center; gap:6px; font-family:var(--font-mono); font-size:0.88rem;">';
      if (tokens.length >= 2) formulaHtml += '<span style="color:#6e7d8a; font-weight:bold;">(</span>';

      tokens.forEach((token, idx) => {
        const isNot = !!this.polarities[idx];
        const polClass = isNot ? 'is-not' : 'is-direct';
        const polLabel = this.getPolarityLabel(isNot);

        formulaHtml += `
          <button class="polarity-btn ${polClass}" data-pidx="${idx}" title="Alternar Direto (+) ou Invertido (NOT)">
            [ ${polLabel} ]
          </button>
          <span class="sensor-token">${token}</span>
        `;

        if (idx === 1 && tokens.length > 2) {
          formulaHtml += '<span style="color:#6e7d8a; font-weight:bold;">)</span>';
        }

        if (idx < tokens.length - 1) {
          const slotVal = this.slots[idx] || '?';
          const isActiveSlot = idx === this.activeSlot ? 'is-active' : '';
          formulaHtml += `
            <button class="slot-btn ${isActiveSlot}" data-sidx="${idx}" title="Clique para selecionar este operador">
              [ ${this.getOpLabel(slotVal)} ]
            </button>
          `;
        }
      });
      formulaHtml += '</div>';

      const stageBadge = totalStages > 1 
        ? `<div style="font-size:0.75rem; background:rgba(229,160,13,0.15); color:var(--military-amber); border:1px solid rgba(229,160,13,0.35); padding:4px 8px; border-radius:4px; margin-bottom:6px; font-weight:bold; display:flex; justify-content:space-between;">
             <span>📍 ${missionTitle || 'SURTIDA TÁTICA'}</span>
             <span>ETAPA ${stageIdx + 1} DE ${totalStages}</span>
           </div>`
        : '';

      this.consoleEl.innerHTML = `
        ${stageBadge}
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="console-section-title">🛰️ SENSORES FLIR — ${sec.sector_name}</span>
          <button id="btn-toggle-syntax" class="btn-secondary-tactical" style="padding:2px 6px; font-size:0.75rem;">
            ${this.isNatural ? '🔤 Linguagem Natural' : '💻 Código Técnico'}
          </button>
        </div>
        <div class="sensors-grid">${sensorsHtml}</div>
        <span class="console-section-title">📋 ESCOLHA DO PROTOCOLO TÁTICO</span>
        <div style="display:flex; gap:6px; flex-direction:column;">${tabsHtml}</div>
        <div class="protocol-card">
          <span class="protocol-title">Engenharia da Regra Lógica:</span>
          <p style="font-size:0.75rem; color:var(--text-muted); margin:0;">
            Clique em <strong>[ + / NÃO ]</strong> para inverter polaridade e selecione o conectivo nos <strong>[ ? ]</strong>:
          </p>
          <div class="formula-display">${formulaHtml}</div>
          <span style="font-size:0.75rem; color:var(--text-muted);">Conectivo para o slot [ ? ] ativo:</span>
          <div class="operator-palette">
            <button class="op-btn" data-op="AND">${this.getOpLabel('AND')}</button>
            <button class="op-btn" data-op="OR">${this.getOpLabel('OR')}</button>
            <button class="op-btn" data-op="XOR">${this.getOpLabel('XOR')}</button>
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <button id="btn-exec" class="btn-tactical" style="flex:1;">🚀 EXECUTAR PROTOCOLO</button>
          <button id="btn-hint" class="btn-secondary-tactical" style="color:var(--military-amber);">💡 DICA</button>
        </div>
      `;

      // Eventos da Mesa
      document.getElementById('btn-toggle-syntax').onclick = () => {
        this.audio.playClick();
        this.isNatural = !this.isNatural;
        this.renderSector(sec, stageIdx, totalStages, missionTitle);
      };
      document.querySelectorAll('.proto-tab-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.selectedProtoIdx = parseInt(btn.getAttribute('data-idx'));
          this.polarities = [];
          this.slots = ['?', '?'];
          this.renderSector(sec, stageIdx, totalStages, missionTitle);
        };
      });
      document.querySelectorAll('.polarity-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          const pidx = parseInt(btn.getAttribute('data-pidx'));
          this.polarities[pidx] = !this.polarities[pidx];
          this.renderSector(sec, stageIdx, totalStages, missionTitle);
        };
      });
      document.querySelectorAll('.slot-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.activeSlot = parseInt(btn.getAttribute('data-sidx'));
          this.renderSector(sec, stageIdx, totalStages, missionTitle);
        };
      });
      document.querySelectorAll('.op-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.slots[this.activeSlot] = btn.getAttribute('data-op');
          this.activeSlot = (this.activeSlot + 1) % this.slots.length;
          this.renderSector(sec, stageIdx, totalStages, missionTitle);
        };
      });
      document.getElementById('btn-exec').onclick = () => {
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
  class OperacaoNexo {
    constructor() {
      this.bus = new EventBus();
      this.audio = new AudioSystem();
      this.drone = new DroneController(45, 45);
      
      this.gameState = 'MENU'; // MENU, GAMEPLAY, PAUSED, VICTORY, GAMEOVER
      this.currentMode = 'training'; // training, ranked
      this.score = 0;
      this.timer = 60;
      this.streak = 0;

      this.currentSeasonIdx = 0;
      this.currentWeekIdx = 0;
      this.currentStageIdx = 0;
      this.currentMission = null;
      this.currentSector = null;
      this.hintsUsedInSector = 0;

      this.init();
    }

    init() {
      this.canvas = document.getElementById('satellite-canvas');
      this.renderer = new MapRenderer(this.canvas);
      this.hud = new TacticalHUD(this.bus, this.audio);
      this.tutorial = new TutorialManager(this.audio, this.bus);

      this.resize();
      window.addEventListener('resize', () => this.resize());

      // Clique no canvas -> Move drone
      this.canvas.addEventListener('pointerdown', (e) => {
        if (this.gameState !== 'GAMEPLAY') return;
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        this.drone.setDestination(x, y);
        this.audio.playClick();
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
          const totalTime = (this.currentSector && this.currentSector.time_limit) ? this.currentSector.time_limit : 60;
          if (this.timer > 0) {
            this.timer -= dt;
            threatRatio = Math.min(1.0, Math.max(0, 1.0 - (this.timer / totalTime)));
            const timeEl = document.getElementById('hud-time-badge');
            if (timeEl) {
              const secLeft = Math.ceil(this.timer);
              if (threatRatio > 0.7) {
                timeEl.textContent = `TIME: ${secLeft}s 🔴 CRÍTICO`;
                timeEl.style.color = '#ff3333';
              } else if (threatRatio > 0.35) {
                timeEl.textContent = `TIME: ${secLeft}s 🟡 EXPANDINDO`;
                timeEl.style.color = 'var(--military-amber)';
              } else {
                timeEl.textContent = `TIME: ${secLeft}s 🟢 SEGURO`;
                timeEl.style.color = 'var(--military-green)';
              }
            }
            if (this.timer <= 0) {
              this.handleTimeout();
            }
          }
        }

        this.renderer.render(this.drone, this.currentSector, { x: this.drone.targetX, y: this.drone.targetY }, threatRatio, this.currentMission, this.currentStageIdx);
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
      this.currentSeasonIdx = 0;
      this.currentWeekIdx = 0;
      this.currentStageIdx = 0;
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
      const seasons = LEVELS_DATA.temporadas || [];
      const season = seasons[seasonIdx] || seasons[0];
      const weeks = season.weeks || [];

      if (weekIdx >= weeks.length) {
        this.finishOperation();
        return;
      }

      this.currentMission = JSON.parse(JSON.stringify(weeks[weekIdx]));
      this.currentMission.mission_title = `${season.region_name} • ${this.currentMission.week_title}`;
      this.currentStageIdx = 0;

      // Carrega textura do mapa se houver
      if (this.renderer && this.currentMission.map_image) {
        this.renderer.loadMap(this.currentMission.map_image);
      }

      this.loadStage(0);
    }

    loadNextWeek() {
      const seasons = LEVELS_DATA.temporadas || [];
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

    loadStage(idx) {
      this.currentStageIdx = idx;
      const stages = this.currentMission.stages || [];
      if (idx >= stages.length) {
        this.handleVictory(this.currentMission, null);
        return;
      }

      const st = stages[idx];
      this.currentSector = st;
      this.timer = st.time_limit || 45;
      this.hintsUsedInSector = 0;

      if (st.coordinates) {
        this.drone.setDestination(st.coordinates.x, st.coordinates.y);
      }

      this.hud.selectedProtoIdx = 0;
      this.hud.polarities = [];
      this.hud.slots = ['?', '?'];
      this.hud.renderSector(st, idx, stages.length, this.currentMission.mission_title);
    }

    handleStageSuccess(stage, protocol) {
      this.audio.playSuccess();

      const timeRatio = Math.max(0, this.timer / (stage.time_limit || 45));
      const mult = this.currentMode === 'ranked' ? 1.5 : 1.0;
      const basePoints = Math.floor((stage.base_score || 1000) * mult);
      const agilityBonus = Math.floor(basePoints * (timeRatio * 0.45));
      const gained = basePoints + agilityBonus;
      this.score += gained;
      this.streak++;

      const scoreBadge = document.getElementById('hud-score-badge');
      if (scoreBadge) {
        scoreBadge.textContent = this.currentMode === 'ranked' ? `SCORE OFICIAL: ${this.score}` : `SCORE TREINO: ${this.score}`;
      }
      const streakBadge = document.getElementById('hud-streak-badge');
      if (streakBadge) streakBadge.textContent = `🔥 OFENSIVA: ${this.streak}`;

      const stages = this.currentMission.stages || [];
      if (this.currentStageIdx + 1 < stages.length) {
        this.loadStage(this.currentStageIdx + 1);
      } else {
        this.handleVictory(this.currentMission, protocol);
      }
    }

    handleVictory(mission, protocol) {
      this.gameState = 'VICTORY';
      this.audio.playSuccess();

      const stars = this.streak >= 2 ? 3 : (this.hintsUsedInSector === 0 ? 2 : 1);
      document.getElementById('victory-stars').textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
      document.getElementById('victory-score-report').innerHTML = `Pontuação Total da Surtida: <strong style="color:var(--military-green);">${this.score} pts</strong> (Ofensiva: 🔥 ${this.streak})`;
      document.getElementById('victory-details-report').textContent = `${mission.mission_title || mission.week_title || 'Missão'} cumprida com maestria! Todos os setores da surtida foram assegurados.`;

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

  // Inicialização Automática
  window.addEventListener('DOMContentLoaded', () => {
    window.nexoApp = new OperacaoNexo();
  });
})();
