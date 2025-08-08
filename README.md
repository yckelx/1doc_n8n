# Automatiza 1Doc

Automação para extração de documentos do sistema 1Doc e organização em planilhas Google Sheets.

## O que faz

Conecta no sistema 1Doc, extrai documentos de diárias/férias/licenças, processa com IA e salva automaticamente em planilhas categorizadas.

<img width="1440" height="67" alt="{1AFDF415-64A4-4451-8719-7479D0872E43}" src="https://github.com/user-attachments/assets/9dcd4d76-72bf-4e33-b326-d6ce16f30787" />

<img width="1349" height="468" alt="{501F561B-B524-40C1-97A2-37F77BA5F409}" src="https://github.com/user-attachments/assets/d84f6fbc-31da-45bb-892d-b7d9fbc97481" />

## Tecnologias

- n8n (workflow)
- Google Gemini 2.0 (IA)
- Google Sheets (armazenamento)
- JavaScript (processamento)
- Tampermonkey (integração com página 1Doc)

## Fluxo

1. **Login** → Acessa 1Doc automaticamente
2. **Extração** → Coleta HTML da página inicial
3. **Filtro** → Seleciona apenas documentos relevantes
4. **IA** → Extrai dados estruturados (documento, assunto, remetente)
5. **Detalhamento** → Acessa cada documento individualmente
6. **Formatação** → IA formata descrições por tipo
7. **Categorização** → Separa por tipo de documento
8. **Salvamento** → Organiza em planilhas específicas

## Configuração

### Credenciais necessárias
- Login do 1Doc
- Google Sheets OAuth2
- Google Gemini API Key

### Planilhas
- `Diárias`
- `Férias` 
- `Licença Família`
- `_TodosOsDocumentos` (controle)

## Uso

**Interface:** Script Tampermonkey na página do 1Doc

**Webhook:** `POST /webhook/07f1980d-27a5-4723-b478-b99fdd6ac5d1`

**Resposta:**
```json
{
  "status": "success",
  "message": "Automação finalizada e dados salvos na planilha!"
}
```

## Resultados

- **Diárias:** `"10, 12 DE JULHO, FRAÇÃO: 1/4"`
- **Férias:** `"Início: 22/07/2025, 10 dias"`  
- **Licença Família:** `"Início: 25/07/2025, 2 dias"`

## Funcionalidades

- Login automatizado
- Processamento em lotes
- Controle de duplicatas
- Tratamento de erros
- Categorização inteligente
