using Microsoft.Extensions.Options;
using WebApplication1.Models;


var builder = WebApplication.CreateBuilder(args);
// Crear politicas para cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy => policy
            .AllowAnyOrigin() // Permitir cualquier origen
            .AllowAnyMethod() // Permitir cualquier método (GET, POST, etc.)
            .AllowAnyHeader()); // Permitir cualquier encabezado
});

// Registrar el servicio EscribirJson
builder.Services.AddSingleton<EscribirJson>();


var app = builder.Build();

// Ruta para consultar pacientes
app.MapGet("/GetPacientes", (EscribirJson escribirJson) =>
{
    var pacientes = escribirJson.LeerPacientes();
    return Results.Ok(pacientes);
});

// Ruta que recibe el json para registrar pacientes
app.MapPost("/AddPaciente", (Paciente paciente, EscribirJson escribirJson) =>
{
    app.Logger.LogInformation($"{paciente}");
    escribirJson.GuardarPaciente(paciente);
    return Results.StatusCode(200);
}
);

app.UseCors("AllowAllOrigins");

app.Run();
