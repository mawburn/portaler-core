package auth

type cache interface {
	Get(key string) (interface{}, bool)
	SetDefault(key string, value interface{})
}
