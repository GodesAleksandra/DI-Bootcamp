import httpx

headers = {
    "Authorization": "Bearer YOUR_GROQ_API_KEY",
    "Content-Type": "application/json"
}

try:
    # Делаем тестовый запрос напрямую через httpx
    response = httpx.get("https://api.groq.com/openai/v1/models", headers=headers)
    print(f"Статус ответа: {response.status_code}")
    if response.status_code == 200:
        print("Доступные модели:")
        for model in response.json().get("data", []):
            print(f" - {model['id']}")
except Exception as e:
    print(f"Ошибка сокета: {e}")