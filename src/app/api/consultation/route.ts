import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  
  // Здесь интеграция с CRM (например, AmoCRM)
  // Пример для AmoCRM:
  /*
  const amoResponse = await fetch('https://yourdomain.amocrm.ru/api/v4/leads', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([{
      name: `Консультация: ${data.name}`,
      custom_fields_values: [
        { field_id: 123456, values: [{ value: data.phone }] },
        { field_id: 654321, values: [{ value: data.email }] }
      ]
    }])
  })
  */

  // Временная заглушка (удалите в продакшене)
  console.log('Lead data:', data)
  
  return NextResponse.json({ success: true })
}