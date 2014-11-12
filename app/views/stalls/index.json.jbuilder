json.array!(@stalls) do |stall|
  json.extract! stall, :id, :name, :price, :description
  json.url stall_url(stall, format: :json)
end
